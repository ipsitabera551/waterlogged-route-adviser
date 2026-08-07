import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import QueryInput from './components/QueryInput';
import RiskBadge from './components/RiskBadge';
import VehicleSelector from './components/VehicleSelector';
import RouteMap from './components/RouteMap';
import RouteSummary from './components/RouteSummary';
import VehicleAdvisoryCard from './components/VehicleAdvisoryCard';
import WeatherSandbox from './components/WeatherSandbox';
import CitizenReportModal from './components/CitizenReportModal';
import HotspotInspector from './components/HotspotInspector';
import EmergencyModal from './components/EmergencyModal';

import { analyzeRouteWithGemini } from './utils/geminiRouteAdvisor';
import { getCitizenReports, saveCitizenReport } from './utils/storage';
import './styles/App.css';

export default function App() {
  // Application States
  const [userQuery, setUserQuery] = useState(
    'I need to travel from Salt Lake Sector V to Park Circus Seven Point on a scooter during heavy rain.'
  );
  const [vehicleKey, setVehicleKey] = useState('TWO_WHEELER');
  const [weatherKey, setWeatherKey] = useState('HEAVY_DOWNPOUR');
  const [isHighTide, setIsHighTide] = useState(true);

  // Modals & Inspection States
  const [citizenReports, setCitizenReports] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Load saved citizen reports from localStorage on mount
  useEffect(() => {
    const loaded = getCitizenReports();
    setCitizenReports(loaded);
  }, []);

  // Compute Gemini AI Route Analysis on any state update
  const analysisResult = useMemo(() => {
    return analyzeRouteWithGemini({
      userQuery,
      vehicleKey,
      weatherKey,
      isHighTide,
      citizenReports
    });
  }, [userQuery, vehicleKey, weatherKey, isHighTide, citizenReports]);

  // Handle citizen report submission
  const handleAddReport = (newReportData) => {
    const updatedList = saveCitizenReport(newReportData);
    setCitizenReports(updatedList);
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
        activeReportCount={citizenReports.length}
      />

      {/* Main Dashboard Layout */}
      <main className="dashboard-grid">
        {/* Left Column: Natural Language Input, Vehicle Selector, Advisory & Sandbox Controls */}
        <section className="control-panel">
          <QueryInput
            currentQuery={userQuery}
            onAnalyzeQuery={(query) => setUserQuery(query)}
          />

          <RiskBadge
            rating={analysisResult.riskRating}
            score={analysisResult.riskScore}
            maxDepth={analysisResult.maxEncounteredDepth}
            vehicleLimit={analysisResult.vehicle.maxDepthCm}
            marginCm={analysisResult.waterMarginCm}
          />

          <VehicleSelector
            selectedVehicleKey={vehicleKey}
            onSelectVehicle={(key) => setVehicleKey(key)}
          />

          <WeatherSandbox
            weatherKey={weatherKey}
            onSelectWeather={(key) => setWeatherKey(key)}
            isHighTide={isHighTide}
            onToggleHighTide={() => setIsHighTide(!isHighTide)}
          />

          <VehicleAdvisoryCard vehicle={analysisResult.vehicle} />
        </section>

        {/* Right Column: Interactive Flood Map Visualizer & Segment-by-Segment Guidance */}
        <section className="map-view-panel">
          <RouteMap
            hotspots={analysisResult.allHotspots}
            selectedHotspot={selectedHotspot}
            onSelectHotspot={(hotspot) => setSelectedHotspot(hotspot)}
            riskRating={analysisResult.riskRating}
          />

          <RouteSummary analysisResult={analysisResult} />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        Waterlogged & Flood-Prone Route Advisor &copy; 2026 — Built for Hackathon Urban Commuter Safety
      </footer>

      {/* Modals */}
      <CitizenReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleAddReport}
      />

      <HotspotInspector
        hotspot={selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
      />

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}
