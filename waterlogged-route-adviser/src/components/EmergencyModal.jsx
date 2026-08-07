import React from 'react';
import { X, PhoneCall, ShieldAlert, ExternalLink } from 'lucide-react';
import { EMERGENCY_HELPLINES } from '../data/kolkataFloodsData';

export default function EmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: '#f43f5e' }}>
            <ShieldAlert size={22} />
            <span>Kolkata Emergency Disaster Helplines</span>
          </h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {EMERGENCY_HELPLINES.map((h, idx) => (
            <div key={idx} style={{
              background: 'rgba(11, 19, 43, 0.7)',
              border: '1px solid var(--glass-border)',
              padding: '12px 14px',
              borderRadius: '10px',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.88rem', color: '#fff' }}>{h.agency}</div>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '2px' }}>{h.service}</div>
              </div>
              <a
                href={`tel:${h.phone}`}
                className="btn btn-danger"
                style={{ padding: '6px 12px', fontSize: '0.82rem', textDecoration: 'none' }}
              >
                <PhoneCall size={14} />
                <span>{h.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
