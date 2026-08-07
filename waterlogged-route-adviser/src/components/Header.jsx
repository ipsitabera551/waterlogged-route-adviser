import React from 'react';
import { Navigation, AlertTriangle, MessageSquarePlus, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Header({ onOpenReportModal, onOpenEmergencyModal, activeReportCount }) {
  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-logo">
          <Navigation size={24} />
        </div>
        <div>
          <h1 className="brand-title">Waterlogged Route Advisor</h1>
          <p className="brand-subtitle">Gemini AI-Powered Urban Flood & Commuter Safety Guidance</p>
        </div>
      </div>

      <div className="header-actions">
        <button className="btn btn-outline" onClick={onOpenReportModal}>
          <MessageSquarePlus size={16} className="text-cyan" />
          <span>Report Flood</span>
          {activeReportCount > 0 && (
            <span style={{
              background: '#f43f5e',
              color: '#fff',
              fontSize: '0.7rem',
              padding: '2px 6px',
              borderRadius: '10px',
              fontWeight: 'bold'
            }}>
              {activeReportCount}
            </span>
          )}
        </button>

        <button className="btn btn-danger" onClick={onOpenEmergencyModal}>
          <PhoneCall size={16} />
          <span>SOS Helplines</span>
        </button>
      </div>
    </header>
  );
}
