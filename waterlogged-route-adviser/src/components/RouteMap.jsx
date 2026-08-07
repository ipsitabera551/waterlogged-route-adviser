import React from 'react';
import { MapPin, Navigation, Info, ShieldAlert, Waves } from 'lucide-react';

export default function RouteMap({ hotspots, selectedHotspot, onSelectHotspot, riskRating }) {
  return (
    <div className="glass-card" style={{ padding: '16px' }}>
      <div className="card-header" style={{ marginBottom: '12px' }}>
        <h2 className="card-title">
          <Navigation size={18} style={{ color: '#00f2fe' }} />
          <span>Interactive Urban Flood Map & Dynamic Route Overlay</span>
        </h2>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.76rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f43f5e' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }}></span>
            Direct Flooded Path
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
            Gemini Safe Bypass
          </span>
        </div>
      </div>

      <div className="map-container">
        {/* SVG Map Visualization */}
        <svg viewBox="0 0 800 500" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>

            {/* Glowing Gradient Filters */}
            <filter id="glow-danger" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-safe" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Map Grid & Hooghly River outline */}
          <rect width="100%" height="100%" fill="#090f1e" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Simulated Hooghly River Bend */}
          <path
            d="M 120 0 C 140 150, 90 300, 110 500"
            fill="none"
            stroke="rgba(79, 172, 254, 0.25)"
            strokeWidth="38"
          />
          <text x="50" y="250" fill="rgba(79, 172, 254, 0.5)" fontSize="12" fontWeight="bold" transform="rotate(-90 50,250)">
            HOOGHLY RIVER (TIDAL ZONE)
          </text>

          {/* Hazardous Direct Route Path (Red Dashed Line) */}
          <path
            d="M 680 120 L 520 220 L 410 280 L 260 400"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="4"
            strokeDasharray="8 6"
            filter="url(#glow-danger)"
            opacity={riskRating === 'HIGH' ? '1' : '0.6'}
          />

          {/* Recommended Safe Alternate Bypass Route (Green Solid Line) */}
          <path
            d="M 680 120 L 620 60 L 380 90 L 220 200 L 260 400"
            fill="none"
            stroke="#10b981"
            strokeWidth="5"
            filter="url(#glow-safe)"
          />

          {/* Hotspot Markers */}
          {hotspots.map((h, idx) => {
            // Map 2D coordinates to SVG canvas space
            const svgX = 180 + ((h.coords[1] - 88.31) * 3600);
            const svgY = 480 - ((h.coords[0] - 22.48) * 3000);

            const isSelected = selectedHotspot?.id === h.id;
            const isHighRisk = h.calculatedRisk === 'HIGH';

            return (
              <g
                key={h.id}
                transform={`translate(${Math.max(80, Math.min(740, svgX))}, ${Math.max(40, Math.min(460, svgY))})`}
                onClick={() => onSelectHotspot(h)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulsing ring for high risk */}
                {isHighRisk && (
                  <circle r="22" fill="rgba(244, 63, 94, 0.25)">
                    <animate attributeName="r" values="14;26;14" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Hotspot circle */}
                <circle
                  r={isSelected ? 14 : 10}
                  fill={isHighRisk ? '#f43f5e' : h.calculatedRisk === 'MODERATE' ? '#f59e0b' : '#10b981'}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? '3' : '1.5'}
                />

                {/* Depth Label Pin */}
                <text
                  y="-16"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="bold"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {h.name.split(' ')[0]} ({h.dynamicDepthCm}cm)
                </text>
              </g>
            );
          })}

          {/* Start / End Markers */}
          <g transform="translate(680, 120)">
            <circle r="8" fill="#00f2fe" stroke="#fff" strokeWidth="2" />
            <text y="22" textAnchor="middle" fill="#00f2fe" fontSize="11" fontWeight="bold">
              ORIGIN (Sector V)
            </text>
          </g>

          <g transform="translate(260, 400)">
            <circle r="8" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <text y="22" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
              DESTINATION (Park Circus)
            </text>
          </g>
        </svg>

        {/* Map Legend Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'rgba(11, 19, 43, 0.85)',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          fontSize: '0.75rem',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#94a3b8' }}>Map Legend:</div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span style={{ color: '#f43f5e' }}>🔴 Severe Flood (&gt;35cm)</span>
            <span style={{ color: '#f59e0b' }}>🟠 Moderate Water (20-35cm)</span>
            <span style={{ color: '#10b981' }}>🟢 Clear (&lt;20cm)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
