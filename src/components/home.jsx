import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase/firebaseConfig"
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Home = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try{
      await signOut(auth);
      navigate('/');
    }catch(error){
      console.log('Error al cerrar sesion: ', error)
    };
  }

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
    <div>
      <h1>Bienvenido, cliente</h1>
      <p>Esta es la página de cliente de la aplicación.</p>
      <button onClick={handleLogout}>Cerrar Sesion</button>
      <ul>
        <li>
          <Link to="/cliente/alquileres">Mis alquileres</Link>
        </li>
        <li>
          <Link to="/cliente/vehiculos">Vehículos disponibles</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;