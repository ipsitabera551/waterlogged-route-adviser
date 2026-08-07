/**
 * Kolkata Urban Flooding & Waterlogging Hardcoded Dataset
 * Comprehensive dataset covering major flood hotspots, vehicle safety thresholds,
 * drainage pumping stations, and weather impact multipliers for real-time risk assessment.
 */

// Vehicle Types & Water Depth Safety Thresholds (in cm)
export const VEHICLE_TYPES = {
  TWO_WHEELER: {
    id: 'TWO_WHEELER',
    name: '2-Wheeler (Scooter / Bike)',
    icon: 'Bike',
    maxDepthCm: 15,
    hydrostaticLockRiskDepthCm: 18,
    exhaustHeightCm: 14,
    description: 'Very vulnerable to low air intakes (12-15cm) and loss of traction on slippery submerged manholes.',
    advisoryTips: [
      'Avoid standing water exceeding 15cm (half-wheel level).',
      'Keep engine revving high in low gear if crossing shallow water.',
      'Watch out for open manholes hidden under murky water.'
    ]
  },
  AUTO: {
    id: 'AUTO',
    name: 'Auto-Rikshaw / 3-Wheeler',
    icon: 'Car',
    maxDepthCm: 20,
    hydrostaticLockRiskDepthCm: 22,
    exhaustHeightCm: 18,
    description: 'Low chassis height with high risk of engine stalling in underpasses.',
    advisoryTips: [
      'Do not attempt underpass crossings with water > 20cm.',
      'Maintain steady momentum without stopping mid-water.',
      'Be cautious of wave surges created by heavy trucks.'
    ]
  },
  HATCHBACK_SEDAN: {
    id: 'HATCHBACK_SEDAN',
    name: 'Hatchback / Sedan',
    icon: 'CarFront',
    maxDepthCm: 30,
    hydrostaticLockRiskDepthCm: 35,
    exhaustHeightCm: 28,
    description: 'Moderate ground clearance. Air filter intake susceptible to water ingress above bumper height.',
    advisoryTips: [
      'Turn off AC before driving into water to prevent fan blade damage.',
      'If engine stalls, DO NOT attempt to restart (prevents engine hydrostatic lock).',
      'Drive along the center crown of the road where water is shallowest.'
    ]
  },
  SUV_4X4: {
    id: 'SUV_4X4',
    name: 'SUV / Crossover / 4x4',
    icon: 'Truck',
    maxDepthCm: 45,
    hydrostaticLockRiskDepthCm: 55,
    exhaustHeightCm: 45,
    description: 'High ground clearance (200mm+). Better wading depth capability but must respect deep underpasses.',
    advisoryTips: [
      'Safe for most surface waterlogging up to 45cm.',
      'Drive slowly to create a bow wave in front of the vehicle.',
      'Avoid deep railway underpasses during cloudbursts.'
    ]
  },
  BUS_TRUCK: {
    id: 'BUS_TRUCK',
    name: 'Bus / Commercial Heavy Vehicle',
    icon: 'Bus',
    maxDepthCm: 70,
    hydrostaticLockRiskDepthCm: 85,
    exhaustHeightCm: 75,
    description: 'Highest clearance. Main hazard is causing dangerous wave action for smaller vehicles.',
    advisoryTips: [
      'Maintain slow speed near flooded pedestrian zones.',
      'Avoid pushing bow waves into stranded two-wheelers.'
    ]
  }
};

// Weather Conditions & Multipliers
export const WEATHER_CONDITIONS = {
  DRY: {
    id: 'DRY',
    label: 'Dry / Overcast',
    icon: 'Sun',
    depthMultiplier: 0.1,
    description: 'Residual waterlogging only in low-lying pockets.'
  },
  LIGHT_RAIN: {
    id: 'LIGHT_RAIN',
    label: 'Light Drizzle (<10mm/h)',
    icon: 'CloudDrizzle',
    depthMultiplier: 0.6,
    description: 'Slow accumulation in poor drainage areas.'
  },
  HEAVY_DOWNPOUR: {
    id: 'HEAVY_DOWNPOUR',
    label: 'Heavy Downpour (35mm/h)',
    icon: 'CloudRain',
    depthMultiplier: 1.3,
    description: 'Rapid water accumulation in underpasses & major arterial roads.'
  },
  CLOUDBURST: {
    id: 'CLOUDBURST',
    label: 'Extreme Cloudburst (75mm/h)',
    icon: 'CloudLightning',
    depthMultiplier: 2.2,
    description: 'Severe urban flooding! Multiple underpasses fully submerged.'
  }
};

// Major Kolkata Flood Hotspots & Road Segments
export const KOLKATA_HOTSPOTS = [
  {
    id: 'chingrighata',
    name: 'Chingrighata Flyover & Underpass',
    zone: 'EM Bypass / Salt Lake Connector',
    coords: [22.5645, 88.3980],
    baseDepthCm: 38,
    historicalRisk: 'HIGH',
    elevationMeters: 4.2,
    drainagePumpStation: 'Dhapa Pumping Station (Capacity: 85%)',
    bypassRoute: 'Take Nabadiganta Sector V Main Arterial -> Salt Lake Bypass -> Nicco Park Road',
    frequentIssues: 'Severe water accumulation under flyover ramps; heavy traffic bottlenecks during rains.',
    reportsCount: 14
  },
  {
    id: 'park_circus',
    name: 'Park Circus Seven Point Crossing',
    zone: 'South-Central Kolkata',
    coords: [22.5448, 88.3695],
    baseDepthCm: 32,
    historicalRisk: 'HIGH',
    elevationMeters: 3.8,
    drainagePumpStation: 'Ballygunge Pumping Station (Capacity: 90%)',
    bypassRoute: 'Use Suhrawardy Avenue -> Darga Road -> CIT Road via Beniapukur',
    frequentIssues: 'Low-lying intersection with heavy tidal lockgate impact from Circular Canal.',
    reportsCount: 22
  },
  {
    id: 'ultadanga',
    name: 'Ultadanga Hudco Underpass & Station Road',
    zone: 'North Kolkata Connector',
    coords: [22.5930, 88.3840],
    baseDepthCm: 46,
    historicalRisk: 'HIGH',
    elevationMeters: 2.9,
    drainagePumpStation: 'Ultadanga Drainage Canal Station (Capacity: 75%)',
    bypassRoute: 'Use VIP Road Flyover ramp -> Kazi Nazrul Islam Avenue -> Lake Town Flyover',
    frequentIssues: 'Extreme underpass water trap (>40cm water depth); engine hydrostatic lock hotspot.',
    reportsCount: 19
  },
  {
    id: 'behala_tram',
    name: 'Behala Tram Depot & Diamond Harbour Road',
    zone: 'South-West Kolkata',
    coords: [22.4975, 88.3180],
    baseDepthCm: 42,
    historicalRisk: 'HIGH',
    elevationMeters: 3.1,
    drainagePumpStation: 'Kudghat Pumping Station (Capacity: 70%)',
    bypassRoute: 'Use James Long Sarani parallel arterial road via Taratala',
    frequentIssues: 'High siltation in storm drains; prolonged waterlogging lasting 4-8 hours post-storm.',
    reportsCount: 31
  },
  {
    id: 'central_avenue',
    name: 'Central Avenue (MG Road Crossing)',
    zone: 'Central Commercial Hub',
    coords: [22.5780, 88.3610],
    baseDepthCm: 28,
    historicalRisk: 'MODERATE',
    elevationMeters: 4.8,
    drainagePumpStation: 'Palmer Bazar Pumping Station (Capacity: 95%)',
    bypassRoute: 'Use Strand Road along Hooghly River or Amherst Street arterial line',
    frequentIssues: 'Knee-deep water on tram tracks during heavy rain; slow traffic clearance.',
    reportsCount: 11
  },
  {
    id: 'vip_road',
    name: 'VIP Road (Teghoria & Haldiram Crossing)',
    zone: 'Airport Corridor',
    coords: [22.6210, 88.4320],
    baseDepthCm: 25,
    historicalRisk: 'MODERATE',
    elevationMeters: 5.1,
    drainagePumpStation: 'Rajarhat Main Drainage Canal (Capacity: 88%)',
    bypassRoute: 'Use Major Arterial Road (MAR) via New Town Eco Park Expressway',
    frequentIssues: 'Water pooling in service lanes; main flyovers remain open and safe.',
    reportsCount: 8
  },
  {
    id: 'college_street',
    name: 'College Street & MG Road Junction',
    zone: 'North-Central Heritage Area',
    coords: [22.5740, 88.3645],
    baseDepthCm: 35,
    historicalRisk: 'HIGH',
    elevationMeters: 3.5,
    drainagePumpStation: 'Thanthania Pumping Station (Capacity: 80%)',
    bypassRoute: 'Use Bidhan Sarani -> AJC Bose Road Flyover link',
    frequentIssues: 'Historic flood zone; water enters shops and book stalls during cloudbursts.',
    reportsCount: 16
  },
  {
    id: 'esplanade',
    name: 'Esplanade Bus Terminus & Curzon Park',
    zone: 'Central Transit Hub',
    coords: [22.5640, 88.3515],
    baseDepthCm: 22,
    historicalRisk: 'MODERATE',
    elevationMeters: 5.5,
    drainagePumpStation: 'Dharmatala Pumping Station (Capacity: 92%)',
    bypassRoute: 'Use Red Road / Maidan Boulevard routes',
    frequentIssues: 'Surface runoff near metro exits and bus terminals; quick recovery.',
    reportsCount: 7
  },
  {
    id: 'salt_lake_sec5',
    name: 'Salt Lake Sector V (College More & Wipro Circle)',
    zone: 'IT Hub',
    coords: [22.5765, 88.4330],
    baseDepthCm: 18,
    historicalRisk: 'LOW',
    elevationMeters: 6.0,
    drainagePumpStation: 'Nabadiganta Pumping Station (Capacity: 98%)',
    bypassRoute: 'Use Street Number 18 -> Ring Road towards Technopolis',
    frequentIssues: 'Minor localized water pooling near pavement curbs; generally navigable.',
    reportsCount: 5
  },
  {
    id: 'ruby_crossing',
    name: 'Ruby Hospital Crossing (EM Bypass)',
    zone: 'South-East Corridor',
    coords: [22.5160, 88.3970],
    baseDepthCm: 26,
    historicalRisk: 'MODERATE',
    elevationMeters: 4.9,
    drainagePumpStation: 'Topsea Pumping Station (Capacity: 89%)',
    bypassRoute: 'Use Anandapur Road -> Kasba Connector',
    frequentIssues: 'Water accumulation on service lanes; main flyover is clear.',
    reportsCount: 9
  }
];

// Major Kolkata Destinations for Auto-suggest
export const POPULAR_LOCATIONS = [
  'Salt Lake Sector V',
  'Park Circus Seven Point',
  'Ultadanga Hudco Crossing',
  'Behala Tram Depot',
  'Central Avenue (MG Road)',
  'VIP Road (Teghoria)',
  'Esplanade Bus Stand',
  'College Street',
  'Ruby Crossing (EM Bypass)',
  'Howrah Railway Station',
  'Sealdah Railway Station',
  'Kolkata Airport (CCU)',
  'New Town Action Area 1',
  'Gariahat Crossing',
  'Jadavpur 8B Bus Stand'
];

// Emergency SOS Contact Directory
export const EMERGENCY_HELPLINES = [
  {
    agency: 'KMC Disaster Management Control Room',
    phone: '033-2286-1212',
    altPhone: '033-2286-1313',
    service: 'Urban Waterlogging, Drainage & Tree Fall Complaints',
    is24x7: true
  },
  {
    agency: 'Kolkata Traffic Police Control Room',
    phone: '1073',
    altPhone: '033-2214-3644',
    service: 'Live Traffic Diversions, Breakdown & Vehicle Rescue',
    is24x7: true
  },
  {
    agency: 'West Bengal State Emergency Operation Centre',
    phone: '1070',
    altPhone: '033-2214-3526',
    service: 'Severe Flood Relief & NDRF Deployment',
    is24x7: true
  },
  {
    agency: 'KMC Pumping Station Emergency Cell',
    phone: '033-2286-1414',
    service: 'Lockgate & Drainage Pump Operation Inquiries',
    is24x7: true
  },
  {
    agency: 'Submerged Vehicle Breakdown & Towing Service',
    phone: '+91 98300 12345',
    service: 'Hydraulic Flatbed Towing for Stalled Vehicles',
    is24x7: true
  }
];
