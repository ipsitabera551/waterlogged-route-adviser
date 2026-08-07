/**
 * Browser LocalStorage Manager
 * Stores citizen crowdsourced waterlogging reports, offline route favorites,
 * and user preferences completely client-side without external cloud databases.
 */

const STORAGE_KEYS = {
  REPORTS: 'waterlogged_adviser_citizen_reports_v1',
  SAVED_ROUTES: 'waterlogged_adviser_saved_routes_v1',
  SETTINGS: 'waterlogged_adviser_user_settings_v1'
};

// Initial hardcoded citizen reports for Kolkata demo
const INITIAL_CITIZEN_REPORTS = [
  {
    id: 'rep-1',
    hotspotId: 'ultadanga',
    locationName: 'Ultadanga Hudco Crossing',
    waterDepthCm: 48,
    reporterName: 'Sudipto M.',
    vehicleStalled: true,
    notes: '2 scooters stalled near Hudco Underpass! Water level reaching knee height. Avoid taking the left slip road.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: 'rep-2',
    hotspotId: 'park_circus',
    locationName: 'Park Circus 7-Point',
    waterDepthCm: 36,
    reporterName: 'Ananya R.',
    vehicleStalled: false,
    notes: 'Drainage pump running at full speed. Traffic moving slowly through middle lanes.',
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  },
  {
    id: 'rep-3',
    hotspotId: 'chingrighata',
    locationName: 'Chingrighata EM Bypass Ramps',
    waterDepthCm: 40,
    reporterName: 'Rajesh K.',
    vehicleStalled: true,
    notes: 'Heavy water logging under flyover pillar 12. Take the Salt Lake Sector V bypass road instead.',
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString()
  }
];

export const getCitizenReports = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REPORTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_CITIZEN_REPORTS));
      return INITIAL_CITIZEN_REPORTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading citizen reports from localStorage:', err);
    return INITIAL_CITIZEN_REPORTS;
  }
};

export const saveCitizenReport = (newReport) => {
  try {
    const current = getCitizenReports();
    const formatted = {
      id: `rep-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...newReport
    };
    const updated = [formatted, ...current];
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving citizen report to localStorage:', err);
    return [];
  }
};

export const clearCitizenReports = () => {
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_CITIZEN_REPORTS));
  return INITIAL_CITIZEN_REPORTS;
};

export const getSavedRoutes = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_ROUTES);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
};

export const saveFavoriteRoute = (route) => {
  try {
    const current = getSavedRoutes();
    const updated = [route, ...current.filter(r => r.id !== route.id)];
    localStorage.setItem(STORAGE_KEYS.SAVED_ROUTES, JSON.stringify(updated));
    return updated;
  } catch (err) {
    return [];
  }
};
