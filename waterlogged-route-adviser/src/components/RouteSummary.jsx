import React from 'react';
import { ShieldCheck, AlertTriangle, Clock, MapPin, ArrowRight, CornerUpRight } from 'lucide-react';

export default function RouteSummary({ analysisResult }) {
  if (!analysisResult) return null;

  const { riskRating, summaryHeading, aiRecommendationText, segments, avoidList, safeRouteSummary, vehicle } = analysisResult;

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <ShieldCheck size={18} style={{ color: '#10b981' }} />
          <span>Gemini AI Route Advisory Summary</span>
        </h2>
      </div>

      {/* AI Recommendation Box */}
      <div style={{
        padding: '16px',
        borderRadius: '12px',
        background: riskRating === 'HIGH' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.12)',
        border: `1px solid ${riskRating === 'HIGH' ? '#f43f5e' : '#10b981'}`,
        marginBottom: '16px'
      }}>
        <h3 style={{ fontSize: '0.96rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
          {summaryHeading}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
          {aiRecommendationText}
        </p>
      </div>

      {/* Avoid Hotspots Warnings */}
      {avoidList.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#f43f5e', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={15} />
            <span>Flooded Segments to Avoid Immediately:</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {avoidList.map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(244, 63, 94, 0.08)',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <span style={{ color: '#fda4af', fontWeight: 'bold' }}>{item.depth}cm Water</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safe Route Detour Recommendation */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: '10px',
        padding: '14px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CornerUpRight size={16} />
            <span>Recommended Safe Alternate Bypass</span>
          </span>
          <span style={{ fontSize: '0.76rem', color: '#6ee7b7', fontWeight: 600 }}>
            {safeRouteSummary.timeSaved}
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px' }}>
          {safeRouteSummary.safePathDesc}
        </p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: '#94a3b8' }}>
          <span>Distance: <strong>{safeRouteSummary.distanceKm}</strong></span>
          <span>Safe ETA: <strong style={{ color: '#10b981' }}>{safeRouteSummary.safeEta}</strong></span>
        </div>
      </div>

      {/* Step-by-Step Segment Breakdown */}
      <div>
        <h4 style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '8px' }}>
          Segment-by-Segment Water Clearance Analysis:
        </h4>
        <div className="segment-list">
          {segments.map((s) => (
            <div key={s.segmentId} className={`segment-item ${s.status}`}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{s.name}</div>
                <div style={{ fontSize: '0.76rem', color: '#cbd5e1', marginTop: '2px' }}>{s.warning}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{s.waterDepthCm} cm</span>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Delay: +{s.delayMinutes}m</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
