import React from 'react';
import { X, Info, Activity, Navigation, ArrowUpRight } from 'lucide-react';

export default function HotspotInspector({ hotspot, onClose }) {
  if (!hotspot) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={20} style={{ color: '#00f2fe' }} />
            <span>Hotspot Inspection: {hotspot.name}</span>
          </h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            background: 'rgba(11, 19, 43, 0.7)',
            padding: '14px',
            borderRadius: '10px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Live Water Depth</span>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: hotspot.calculatedRisk === 'HIGH' ? '#f43f5e' : '#f59e0b'
              }}>
                {hotspot.dynamicDepthCm} cm
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Ground Elevation</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#00f2fe' }}>
                {hotspot.elevationMeters} m
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '4px' }}>
              Drainage Infrastructure Status:
            </h4>
            <div style={{ fontSize: '0.84rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={16} />
              <span>{hotspot.drainagePumpStation}</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '4px' }}>
              Frequent Urban Flood Issues:
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              {hotspot.frequentIssues}
            </p>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            padding: '12px',
            borderRadius: '8px'
          }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#10b981', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpRight size={16} />
              <span>Recommended Bypass Detour:</span>
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
              {hotspot.bypassRoute}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
