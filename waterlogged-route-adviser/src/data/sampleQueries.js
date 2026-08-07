/**
 * Pre-configured Natural Language Sample Queries for Hackathon Demonstration
 * Demonstrates Gemini AI parsing across various locations, vehicle types, and urgency levels.
 */

export const SAMPLE_QUERIES = [
  {
    id: 1,
    title: 'Scooter from Salt Lake Sec V to Park Circus',
    query: 'I need to travel from Salt Lake Sector V to Park Circus Seven Point on a scooter during heavy rain.',
    origin: 'Salt Lake Sector V',
    destination: 'Park Circus Seven Point',
    vehicle: 'TWO_WHEELER',
    badge: 'High Risk 🚨'
  },
  {
    id: 2,
    title: 'Hatchback from Ultadanga to Gariahat',
    query: 'Is Ultadanga Hudco underpass safe for a hatchback car right now? I am commuting towards Gariahat.',
    origin: 'Ultadanga Hudco Crossing',
    destination: 'Gariahat Crossing',
    vehicle: 'HATCHBACK_SEDAN',
    badge: 'Caution ⚠️'
  },
  {
    id: 3,
    title: 'SUV Commute from Behala to Esplanade',
    query: 'Need the safest route from Behala Tram Depot to Esplanade in an SUV during severe downpour.',
    origin: 'Behala Tram Depot',
    destination: 'Esplanade Bus Stand',
    vehicle: 'SUV_4X4',
    badge: 'Safe Alternate ✅'
  },
  {
    id: 4,
    title: 'Auto Trip from Central Avenue to Airport',
    query: 'Can an auto-rickshaw go through Central Avenue and VIP Road to Kolkata Airport right now?',
    origin: 'Central Avenue (MG Road)',
    destination: 'Kolkata Airport (CCU)',
    vehicle: 'AUTO',
    badge: 'Detour Required 🔄'
  }
];
