import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase/firebaseConfig";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './home.css';


const Home = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  useEffect(() => {
    const vehiculosCollectionRef = collection(db, 'vehiculos');
    const getVehiculos = async () => {
      const querySnapshot = await getDocs(vehiculosCollectionRef);
      const vehiculos = querySnapshot.docs.map((doc) => doc.data());
      setVehiculos(vehiculos);
    };
    getVehiculos();
  }, []);

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Bienvenido, Cliente</h1>
        <p>Esta es la página de cliente de la aplicación.</p>
      </div>
      
      <div className="home-form">
        <ul className="home-links">
          <li>
            <Link to="/cliente/alquileres">Mis alquileres</Link>
          </li>
          <li>
            <Link to="/cliente/vehiculos">Vehículos disponibles</Link>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;