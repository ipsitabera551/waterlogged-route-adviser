import React, { useState } from 'react';
import { X, MessageSquarePlus, AlertTriangle, Check } from 'lucide-react';
import { KOLKATA_HOTSPOTS } from '../data/kolkataFloodsData';

export default function CitizenReportModal({ isOpen, onClose, onSubmitReport }) {
  const [hotspotId, setHotspotId] = useState(KOLKATA_HOTSPOTS[0].id);
  const [depthCm, setDepthCm] = useState(35);
  const [reporterName, setReporterName] = useState('');
  const [vehicleStalled, setVehicleStalled] = useState(true);
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSpot = KOLKATA_HOTSPOTS.find(h => h.id === hotspotId);
    
    onSubmitReport({
      hotspotId,
      locationName: selectedSpot?.name || 'Kolkata Hotspot',
      waterDepthCm: Number(depthCm),
      reporterName: reporterName || 'Anonymous Citizen',
      vehicleStalled,
      notes: notes || 'Waterlogging reported.'
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquarePlus size={20} style={{ color: '#00f2fe' }} />
            <span>Citizen Live Waterlogging Report</span>
          </h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {submittedSuccess ? (
          <div style={{ textAlignment: 'center', padding: '30px 10px', textAlign: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px'
            }}>
              <Check size={28} color="#fff" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Report Broadcasted!</h3>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: '6px' }}>
              Your report has updated the live map and saved locally. Thank you for keeping Kolkata safe!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Select Waterlogged Location</label>
              <select
                className="form-control"
                value={hotspotId}
                onChange={(e) => setHotspotId(e.target.value)}
              >
                {KOLKATA_HOTSPOTS.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.zone})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Water Depth: {depthCm} cm</label>
              <input
                type="range"
                min="10"
                max="90"
                value={depthCm}
                onChange={(e) => setDepthCm(e.target.value)}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
                <span>10 cm (Ankle)</span>
                <span>40 cm (Knee)</span>
                <span>90 cm (Waist)</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Your Name (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Sudipto M."
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="stalled"
                checked={vehicleStalled}
                onChange={(e) => setVehicleStalled(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="stalled" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>
                Vehicles currently stalled at this spot?
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Live Conditions / Notes</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="e.g. Underpass flooded, scooters turning back..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Broadcast Live Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
