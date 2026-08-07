import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function RiskBadge({ rating, score, maxDepth, vehicleLimit, marginCm }) {
  const getBadgeContent = () => {
    switch (rating) {
      case 'HIGH':
        return {
          icon: <AlertOctagon size={16} />,
          label: 'HIGH RISK 🚨',
          desc: 'Unsafe for selected vehicle!'
        };
      case 'MODERATE':
        return {
          icon: <AlertTriangle size={16} />,
          label: 'MODERATE ⚠️',
          desc: 'Proceed with caution'
        };
      case 'SAFE':
      default:
        return {
          icon: <CheckCircle2 size={16} />,
          label: 'SAFE ROUTE ✅',
          desc: 'Clear of dangerous floods'
        };
    }
  };

  const badge = getBadgeContent();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <div className={`risk-badge ${rating}`}>
        {badge.icon}
        <span>{badge.label}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8rem' }}>
        <div>
          <span style={{ color: '#94a3b8' }}>Risk Index: </span>
          <strong style={{ color: rating === 'HIGH' ? '#fda4af' : rating === 'MODERATE' ? '#fcd34d' : '#6ee7b7' }}>
            {score}/100
          </strong>
        </div>

        <div>
          <span style={{ color: '#94a3b8' }}>Max Depth: </span>
          <strong>{maxDepth} cm</strong>
          <span style={{ color: '#64748b', fontSize: '0.74rem' }}> (Limit: {vehicleLimit}cm)</span>
        </div>
      </div>
    </div>
  );
}
