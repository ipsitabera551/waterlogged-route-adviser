import React from 'react';
import { CloudRain, Sun, CloudDrizzle, CloudLightning, Waves } from 'lucide-react';
import { WEATHER_CONDITIONS } from '../data/kolkataFloodsData';

export default function WeatherSandbox({ weatherKey, onSelectWeather, isHighTide, onToggleHighTide }) {
  const getWeatherIcon = (key) => {
    switch (key) {
      case 'DRY': return <Sun size={18} />;
      case 'LIGHT_RAIN': return <CloudDrizzle size={18} />;
      case 'HEAVY_DOWNPOUR': return <CloudRain size={18} />;
      case 'CLOUDBURST': return <CloudLightning size={18} />;
      default: return <CloudRain size={18} />;
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <CloudRain size={18} style={{ color: '#00f2fe' }} />
          <span>Live Weather & Tide Conditions Sandbox</span>
        </h2>
        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Hackathon Live Simulator</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
        {Object.values(WEATHER_CONDITIONS).map((w) => {
          const isSelected = weatherKey === w.id;
          return (
            <button
              key={w.id}
              type="button"
              className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
              style={{
                padding: '8px 4px',
                fontSize: '0.74rem',
                flexDirection: 'column',
                gap: '4px',
                borderRadius: '8px',
                textAlign: 'center'
              }}
              onClick={() => onSelectWeather(w.id)}
            >
              {getWeatherIcon(w.id)}
              <span>{w.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Ganges High Tide Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '10px 14px',
        background: isHighTide ? 'rgba(0, 242, 254, 0.15)' : 'rgba(11, 19, 43, 0.6)',
        border: `1px solid ${isHighTide ? '#00f2fe' : 'var(--glass-border)'}`,
        borderRadius: '8px',
        cursor: 'pointer'
      }} onClick={onToggleHighTide}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Waves size={20} style={{ color: isHighTide ? '#00f2fe' : '#94a3b8' }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#fff' }}>
              Hooghly River High Tide Lockgate State
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              {isHighTide ? 'Lockgates CLOSED (+12cm depth in low zones)' : 'Lockgates OPEN (Normal drainage flow)'}
            </div>
          </div>
        </div>

        <input
          type="checkbox"
          checked={isHighTide}
          onChange={() => {}}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}
