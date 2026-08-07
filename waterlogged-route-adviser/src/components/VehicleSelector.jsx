import React from 'react';
import { Bike, Car, CarFront, Truck, Bus, Shield } from 'lucide-react';
import { VEHICLE_TYPES } from '../data/kolkataFloodsData';

export default function VehicleSelector({ selectedVehicleKey, onSelectVehicle }) {
  const getVehicleIcon = (iconName) => {
    switch (iconName) {
      case 'Bike': return <Bike size={22} />;
      case 'Car': return <Car size={22} />;
      case 'CarFront': return <CarFront size={22} />;
      case 'Truck': return <Truck size={22} />;
      case 'Bus': return <Bus size={22} />;
      default: return <Car size={22} />;
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <Shield size={18} style={{ color: '#4facfe' }} />
          <span>Vehicle Type & Clearance Wading Specs</span>
        </h2>
      </div>

      <div className="vehicle-grid">
        {Object.values(VEHICLE_TYPES).map((v) => {
          const isSelected = selectedVehicleKey === v.id;
          return (
            <div
              key={v.id}
              className={`vehicle-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectVehicle(v.id)}
            >
              <div style={{ color: isSelected ? '#00f2fe' : '#94a3b8' }}>
                {getVehicleIcon(v.icon)}
              </div>
              <span className="vehicle-name">{v.name.split(' ')[0]}</span>
              <span className="vehicle-depth">Max {v.maxDepthCm}cm</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
