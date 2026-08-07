import React from 'react';
import { ShieldAlert, AlertCircle, CheckCircle } from 'lucide-react';

export default function VehicleAdvisoryCard({ vehicle }) {
  if (!vehicle) return null;

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <ShieldAlert size={18} style={{ color: '#f59e0b' }} />
          <span>Vehicle Safety Advisory: {vehicle.name}</span>
        </h2>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '12px' }}>
        {vehicle.description}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <div style={{ background: 'rgba(11, 19, 43, 0.6)', padding: '10px', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Max Safe Depth</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#00f2fe' }}>
            {vehicle.maxDepthCm} cm
          </div>
        </div>

        <div style={{ background: 'rgba(11, 19, 43, 0.6)', padding: '10px', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Hydrostatic Lock Threshold</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f43f5e' }}>
            {vehicle.hydrostaticLockRiskDepthCm} cm
          </div>
        </div>
      </div>

      <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '6px' }}>
        Commuter Safety Guidelines:
      </h4>
      <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.6' }}>
        {vehicle.advisoryTips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
