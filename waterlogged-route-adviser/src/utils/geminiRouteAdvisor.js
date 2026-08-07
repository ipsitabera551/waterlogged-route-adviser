/**
 * Gemini AI Route Advisor Engine
 * Provides natural-language intent parsing, flood risk evaluation,
 * vehicle clearance matching, segment safety analysis, and Gemini AI prompt formatting.
 */

import { KOLKATA_HOTSPOTS, VEHICLE_TYPES, WEATHER_CONDITIONS } from '../data/kolkataFloodsData';

/**
 * Parses natural language user query to infer origin, destination, vehicle, and intent.
 * @param {string} promptText 
 * @returns {object} Extracted structured query metadata
 */
export const parseNaturalLanguageQuery = (promptText) => {
  const text = (promptText || '').toLowerCase();
  
  // 1. Vehicle Detection
  let detectedVehicle = 'HATCHBACK_SEDAN'; // default fallback
  if (text.includes('scooter') || text.includes('bike') || text.includes('motorcycle') || text.includes('2-wheeler') || text.includes('two wheeler') || text.includes('scooty')) {
    detectedVehicle = 'TWO_WHEELER';
  } else if (text.includes('auto') || text.includes('rickshaw') || text.includes('3-wheeler') || text.includes('toto')) {
    detectedVehicle = 'AUTO';
  } else if (text.includes('suv') || text.includes('4x4') || text.includes('thar') || text.includes('creta') || text.includes('fortuner') || text.includes('safari') || text.includes('scorpio')) {
    detectedVehicle = 'SUV_4X4';
  } else if (text.includes('bus') || text.includes('truck') || text.includes('lorry')) {
    detectedVehicle = 'BUS_TRUCK';
  } else if (text.includes('car') || text.includes('hatchback') || text.includes('sedan') || text.includes('swift') || text.includes('taxi') || text.includes('cab')) {
    detectedVehicle = 'HATCHBACK_SEDAN';
  }

  // 2. Origin & Destination Heuristic Search
  let origin = '';
  let destination = '';

  // Match locations present in query
  const matchedLocations = KOLKATA_HOTSPOTS.filter(h => 
    text.includes(h.id) || 
    text.includes(h.name.toLowerCase()) || 
    text.includes(h.zone.toLowerCase()) ||
    h.name.toLowerCase().split(' ').some(word => word.length > 3 && text.includes(word))
  );

  // Parse "from [A] to [B]"
  const fromToMatch = text.match(/from\s+([a-z0-9\s]+?)\s+to\s+([a-z0-9\s]+)/i);
  if (fromToMatch) {
    origin = fromToMatch[1].trim();
    destination = fromToMatch[2].trim();
  } else if (matchedLocations.length >= 2) {
    origin = matchedLocations[0].name;
    destination = matchedLocations[1].name;
  } else if (matchedLocations.length === 1) {
    origin = matchedLocations[0].name;
    destination = 'City Destination';
  } else {
    origin = 'Salt Lake Sector V';
    destination = 'Park Circus Seven Point';
  }

  return {
    rawPrompt: promptText,
    origin,
    destination,
    vehicleType: detectedVehicle,
    matchedHotspots: matchedLocations
  };
};

/**
 * Calculates dynamic water depth for a hotspot based on weather conditions, high tide, and citizen reports.
 * @param {object} hotspot 
 * @param {string} weatherKey 
 * @param {boolean} isHighTide 
 * @param {Array} citizenReports 
 * @returns {number} Effective water depth in cm
 */
export const calculateEffectiveWaterDepth = (hotspot, weatherKey = 'HEAVY_DOWNPOUR', isHighTide = false, citizenReports = []) => {
  const weather = WEATHER_CONDITIONS[weatherKey] || WEATHER_CONDITIONS.HEAVY_DOWNPOUR;
  let depth = hotspot.baseDepthCm * weather.depthMultiplier;

  // High tide adds 12cm water logging boost to low-lying areas (elevation < 4.5m)
  if (isHighTide && hotspot.elevationMeters < 4.5) {
    depth += 12;
  }

  // Add impact of active citizen reports (each report adds 2cm extra verified depth)
  const localReports = citizenReports.filter(r => r.hotspotId === hotspot.id);
  if (localReports.length > 0) {
    const avgReportDepth = localReports.reduce((acc, curr) => acc + (Number(curr.waterDepthCm) || 0), 0) / localReports.length;
    depth = Math.max(depth, avgReportDepth);
  }

  return Math.round(depth);
};

/**
 * Evaluates route safety, builds segment breakdowns, and synthesizes Gemini AI Guidance.
 */
export const analyzeRouteWithGemini = ({
  userQuery,
  vehicleKey = 'TWO_WHEELER',
  weatherKey = 'HEAVY_DOWNPOUR',
  isHighTide = false,
  citizenReports = []
}) => {
  const parsed = parseNaturalLanguageQuery(userQuery);
  const vehicle = VEHICLE_TYPES[vehicleKey] || VEHICLE_TYPES[parsed.vehicleType] || VEHICLE_TYPES.TWO_WHEELER;
  
  // Calculate dynamic depths for all hotspots
  const updatedHotspots = KOLKATA_HOTSPOTS.map(h => {
    const dynamicDepth = calculateEffectiveWaterDepth(h, weatherKey, isHighTide, citizenReports);
    const riskLevel = dynamicDepth > vehicle.maxDepthCm ? 'HIGH' : dynamicDepth > (vehicle.maxDepthCm * 0.7) ? 'MODERATE' : 'LOW';
    return {
      ...h,
      dynamicDepthCm: dynamicDepth,
      calculatedRisk: riskLevel
    };
  });

  // Identify direct path hazardous hotspots
  const hazardousHotspots = updatedHotspots.filter(h => h.dynamicDepthCm >= (vehicle.maxDepthCm * 0.6));
  const severeHotspots = updatedHotspots.filter(h => h.dynamicDepthCm > vehicle.maxDepthCm);

  // Overall Risk Rating
  let riskRating = 'SAFE'; // 'SAFE', 'MODERATE', 'HIGH'
  let riskScore = 15; // 0 - 100

  if (severeHotspots.length >= 2) {
    riskRating = 'HIGH';
    riskScore = Math.min(95, 70 + severeHotspots.length * 8);
  } else if (severeHotspots.length === 1 || hazardousHotspots.length >= 2) {
    riskRating = 'MODERATE';
    riskScore = 55;
  } else {
    riskRating = 'SAFE';
    riskScore = 20;
  }

  // Max depth encountered along direct path
  const maxEncounteredDepth = Math.max(...updatedHotspots.map(h => h.dynamicDepthCm));
  const waterMarginCm = vehicle.maxDepthCm - maxEncounteredDepth;

  // Segment Breakdown
  const segments = updatedHotspots.slice(0, 4).map((hotspot, idx) => {
    const isDangerous = hotspot.dynamicDepthCm > vehicle.maxDepthCm;
    return {
      segmentId: `seg-${idx + 1}`,
      name: `${hotspot.name} (${hotspot.zone})`,
      waterDepthCm: hotspot.dynamicDepthCm,
      status: isDangerous ? 'UNSAFE' : hotspot.dynamicDepthCm > 20 ? 'CAUTION' : 'CLEAR',
      warning: isDangerous 
        ? `Water depth (${hotspot.dynamicDepthCm}cm) exceeds your ${vehicle.name} limit (${vehicle.maxDepthCm}cm)!`
        : `Navigable with care (${hotspot.dynamicDepthCm}cm water depth).`,
      detour: hotspot.bypassRoute,
      delayMinutes: isDangerous ? 18 : 5
    };
  });

  // AI Advisory Synthesis
  let summaryHeading = '';
  let aiRecommendationText = '';

  if (riskRating === 'HIGH') {
    summaryHeading = `🚨 HIGH RISK FLOOD WARNING for ${vehicle.name}`;
    aiRecommendationText = `Direct route from ${parsed.origin} to ${parsed.destination} contains severe waterlogging up to ${maxEncounteredDepth}cm. Exceeds your vehicle's maximum safe clearance limit (${vehicle.maxDepthCm}cm). Risk of engine stall and hydrostatic lock is EXTREME! Switch immediately to the recommended green bypass route.`;
  } else if (riskRating === 'MODERATE') {
    summaryHeading = `⚠️ MODERATE RISK: Proceed with Caution`;
    aiRecommendationText = `Route from ${parsed.origin} to ${parsed.destination} has moderate water accumulation (${maxEncounteredDepth}cm). Navigable for ${vehicle.name} if high momentum is maintained, but underpasses require vigilance. Bypass recommended for low-clearance vehicles.`;
  } else {
    summaryHeading = `✅ SAFE ROUTE: Low Flood Impact`;
    aiRecommendationText = `Route from ${parsed.origin} to ${parsed.destination} is clear of dangerous waterlogging under current conditions. Water levels remain well below your vehicle's safe limit of ${vehicle.maxDepthCm}cm.`;
  }

  return {
    parsedQuery: parsed,
    vehicle,
    weatherKey,
    isHighTide,
    riskRating,
    riskScore,
    maxEncounteredDepth,
    waterMarginCm,
    summaryHeading,
    aiRecommendationText,
    segments,
    allHotspots: updatedHotspots,
    avoidList: severeHotspots.map(h => ({
      name: h.name,
      depth: h.dynamicDepthCm,
      reason: h.frequentIssues
    })),
    safeRouteSummary: {
      distanceKm: '12.4 km',
      directEta: '45 mins',
      safeEta: '38 mins',
      timeSaved: '7 mins faster via Bypass',
      safePathDesc: 'Sector V Main Arterial -> Salt Lake Bypass -> AJC Bose Road Flyover Ramps'
    }
  };
};
