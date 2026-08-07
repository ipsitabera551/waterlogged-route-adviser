# 🌊 Waterlogged & Flood-Prone Route Advisor
> **Gemini AI-Powered Urban Flood & Commuter Safety Guidance System**  
> *Built for Hackathon: Societal Benefit & Urban Resilience*

---

## 📌 Problem Statement
Urban flooding during monsoon downpours severely disrupts city commuting, leads to vehicle hydrostatic locks, creates dangerous traffic bottlenecks, and puts lives at risk in submerged underpasses. 

**Waterlogged Route Advisor** is a zero-latency, Gemini-powered web application designed to help commuters navigate urban waterlogging safely. It accepts natural-language travel requests, area names, or route descriptions and instantly provides structured, vehicle-tailored travel guidance, identifies flooded hotspots to avoid, and recommends safer elevated bypass routes.

---

## 🌟 Key Features & Capabilities

- 🤖 **Gemini Natural Language Query Parsing**: Translates complex natural language prompts (e.g. *"I need to ride my scooter from Salt Lake Sector V to Park Circus Seven Point in heavy rain"*) into structured origin, destination, vehicle, and hazard metadata.
- 🚨 **Instant Risk Rating Badge**: Computes real-time risk status (`HIGH RISK 🚨`, `MODERATE ⚠️`, `SAFE ROUTE ✅`) with exact water clearance margins and depth safety gauges.
- 🚗 **Vehicle Clearance & Hydrostatic Lock Advisory**: Custom clearance algorithms tailored for **2-Wheelers**, **Auto-Rickshaws**, **Sedans/Hatchbacks**, **SUVs/4x4s**, and **Buses/Trucks**.
- 🗺️ **Interactive Urban Flood Map & Bypass Overlay**: Custom visualizer displaying real-time water levels across key Kolkata flood hotspots (Chingrighata, Park Circus, Ultadanga Underpass, Behala, Central Avenue) with green safe bypass routes.
- 🌧️ **Live Weather & Ganges High-Tide Simulator**: Interactive controls to simulate Light Drizzle, Heavy Downpour, Cloudbursts, and River High-Tide lockgate closures.
- 📢 **Citizen Waterlogging Crowdsourcing**: Local-first reporting tool storing citizen depth reports in `localStorage` to instantly update the live flood map.
- 🆘 **Emergency SOS Helplines**: Quick access to KMC Disaster Control Room (`033-2286-1212`), Traffic Police (`1073`), and Towing Services.
- ⚡ **100% Offline Compatible & Local First**: No external backend or database required; pre-packaged with complete Kolkata urban flood datasets for zero latency.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React.js 18 (Pure JavaScript - No TypeScript)
- **Styling**: Modern CSS3 with Design Tokens, Glassmorphism, and Dark Night Theme
- **Icons**: Lucide React Icons
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`)
- **Data Persistence**: Browser `localStorage` (Offline-first architecture)
- **Deployment/Demo**: Standard React App (`npm start`) OR Standalone HTML (`standalone.html`)

---

## 📁 Project Folder Structure

```
waterlogged-route-adviser/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Top Navigation & Quick Actions
│   │   ├── QueryInput.jsx             # Gemini Natural Language Input & Sample Pills
│   │   ├── RiskBadge.jsx              # Real-time Risk Level & Clearance Gauge
│   │   ├── VehicleSelector.jsx        # Vehicle Type Selector Grid
│   │   ├── WeatherSandbox.jsx         # Weather Intensity & Tidal Simulator
│   │   ├── VehicleAdvisoryCard.jsx    # Tailored Mechanical Safety Tips
│   │   ├── RouteMap.jsx               # SVG Interactive Map & Safe Bypass Overlay
│   │   ├── RouteSummary.jsx           # AI Summary & Segment-by-Segment Guidance
│   │   ├── HotspotInspector.jsx       # Detailed Hotspot Inspector Modal
│   │   ├── CitizenReportModal.jsx     # Citizen Waterlogging Report Form
│   │   └── EmergencyModal.jsx         # Emergency SOS Contacts Directory
│   ├── data/
│   │   ├── kolkataFloodsData.js       # Hardcoded Hotspots, Vehicles & Helplines
│   │   └── sampleQueries.js           # Pre-configured Hackathon Prompts
│   ├── utils/
│   │   ├── geminiRouteAdvisor.js     # Gemini AI Query Parser & Depth Engine
│   │   └── storage.js                 # LocalStorage Data Manager
│   ├── styles/
│   │   └── App.css                    # Design Tokens & Responsive Glassmorphism Styles
│   ├── App.js                         # Main Application Dashboard Logic
│   └── index.js                       # React DOM Entry Point
├── standalone.html                    # Single-file browser-ready demo
├── package.json
└── README.md
```

---

## 🚀 Installation & Run Commands

### Option A: Standard React Development Server

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ipsitabera551/waterlogged-route-adviser.git
   cd waterlogged-route-adviser
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

### Option B: Zero-Install Standalone HTML Mode (Instant Browser Demo)

Double-click `standalone.html` or open it directly in any modern browser. It loads React and Babel via CDN and runs the complete application offline without needing `npm` or Node.js!

---

## 🗺️ Hardcoded Kolkata Sample Dataset

| Hotspot Name | Zone | Base Depth | Key Risks & Characteristics |
| :--- | :--- | :--- | :--- |
| **Chingrighata Underpass** | EM Bypass / Sector V | 38 cm | Water accumulation under flyover ramps; heavy traffic bottlenecks |
| **Park Circus 7-Point** | South-Central | 32 cm | Low-lying intersection affected by Circular Canal high tide |
| **Ultadanga Hudco Underpass** | North Connector | 46 cm | Severe underpass water trap; primary hydrostatic lock zone |
| **Behala Tram Depot** | South-West | 42 cm | Prolonged waterlogging lasting 4-8 hours post-storm |
| **Central Avenue (MG Road)** | Central Commercial | 28 cm | Submerged tram tracks during heavy rain |
| **College Street** | Heritage District | 35 cm | Historic flood zone affecting book stalls |
| **Salt Lake Sector V** | IT Hub | 18 cm | Minor localized water pooling; safe for most vehicles |

---

## 🧪 Hackathon Demo Walkthrough

1. **Test Prompt 1 (High Risk)**: Click *"Scooter: Sector V to Park Circus"*.  
   *Result*: Triggers `HIGH RISK 🚨` warning because water depth (38-46cm) exceeds 2-wheeler clearance (15cm). Recommends Green Bypass via Salt Lake Bypass & AJC Bose Road Flyover.
2. **Test Prompt 2 (Vehicle Switch)**: Switch vehicle to **SUV/4x4**.  
   *Result*: Risk dynamically recalibrates to `MODERATE` or `SAFE` based on SUV's 45cm clearance limit.
3. **Test Prompt 3 (Weather Simulator)**: Toggle weather to **Cloudburst (75mm/h)** & turn **High Tide ON**.  
   *Result*: Real-time depth increases across all hotspots on the interactive map.
4. **Test Prompt 4 (Citizen Crowdsourcing)**: Click *"Report Flood"*, submit a report for *Ultadanga Underpass* with depth *50cm*.  
   *Result*: Saved into `localStorage`, hotspot badge turns red with citizen report indicator.

---

## 📄 License
Released under the MIT License. Built for societal benefit and urban commuter safety.