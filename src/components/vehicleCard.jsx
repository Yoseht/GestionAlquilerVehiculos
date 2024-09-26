import React from 'react';

const VehicleCard = ({ vehicles }) => {
  return (
    <div className="vehicle-card">
      <h4>{vehicles.marca} {vehicles.model} ({vehicles.año})</h4>
      <img src={vehicles.ImageUrl} alt={vehicles.model} className="estilo-Vehiculo" />
    </div>
  );
};

export default VehicleCard;