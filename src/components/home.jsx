import React, { useState, useEffect } from 'react';
import appFirebase from '../../firebaseConfig';
import { getAuth, signOut } from "firebase/auth";
import VehicleCard from './VehicleCard';

const auth = getAuth(appFirebase);

const Home = ({ correoUsuario, setShowRenta }) => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const datosVehiculos = [
      { id: 1, marca: "Toyota", model: "Corolla", año: 2020, ImageUrl: "https://alborautostoyota.com/wp-content/uploads/2022/05/toyota-corolla-1024x727.png" },
      { id: 2, marca: "Honda", model: "Civic", año: 2019, ImageUrl: "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/AW/Carshot/carshot_CivicSedan_front_CIVIC4DLX_2025_PlatinumWhitePearl_FE2F2SEW_NH-883P.png" },
      { id: 3, marca: "Ford", model: "Focus", año: 2018, ImageUrl: "https://assets.maxterauto.com/gamas/images/18-38-3235-1713365794.png" },
    ];
    setVehiculos(datosVehiculos);
  }, []);

  return (
    <div>
      {/* Header con botones distribuidos */}
      <header className="header">
        <div className="container-header">
          <div className="nav-buttons">
            <button className="btn">Buscar</button>
            <button className="btn">Cuando reservar</button>
            <button className="btn">Ofertas</button>
          </div>
          <button className="btn login-btn">Inicio de Sesion</button>
        </div>
      </header>

      {/* Bienvenida al usuario */}
      <div className="welcome-card">
        <h2>
          Bienvenido, <span className="user-email">{correoUsuario}</span>
        </h2>
        <button className="btn btn-primary logout-btn" onClick={() => signOut(auth)}>
          Cerrar Sesión
        </button>
      </div>

      {/* Catálogo de Vehículos */}
      <div className="catalogo-container">
        <h3 className="catalogo-title">Catálogo de Vehículos</h3>
        <div className="vehicle-grid">
          {vehiculos.map((vehiculo) => (
            <div className="vehicle-card" key={vehiculo.id}>
              <VehicleCard vehicles={vehiculo} />
              <button
                className="btn btn-primary rent-btn"
                onClick={() => setShowRenta()}
              >
                Rentar el vehículo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
