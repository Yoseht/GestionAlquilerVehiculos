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
      <h2 className="text-center">
        Welcome user {correoUsuario}{" "}
        <button className="btn btn-primary" onClick={() => signOut(auth)}>
          LogOut
        </button>
      </h2>
      <h3>Catalogo de Vehiculos</h3>
      <ul>
        {vehiculos.map((vehiculo) => (
          <li key={vehiculo.id}>
            <VehicleCard vehicles={vehiculo} />
            <button
              className="btn btn-primary"
              onClick={() => setShowRenta()}
            >
              Rentar el vehiculo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;