import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { Link, Route, useNavigate, Routes } from 'react-router-dom';
import Clientes from './clientes';
import InventarioVehiculos from './inventarioVehiculos';
import { collection, getDocs } from 'firebase/firestore';

const auth = getAuth();
const Administrador = () =>{
  const navigate = useNavigate();

const handleLogout = async ()=>{
  try {
    await signOut(auth);
    navigate('/');
  } catch (error) {
    console.error('Error al cerrar sesion: ', error)
  }
};
  return (
    <div>
      <h1>Bienvenido, administrador </h1>
      <p>Esta es la página de administrador de la aplicación.</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <ul>
        <li>
          <Link to="/admin/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/admin/vehiculos">Vehículos</Link>
        </li>
        <li>
          <Link to="/admin/alquileres">Alquileres</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/admin/usuarios' Component={Clientes}/>
        <Route path='/admin/vehiculos' Component={InventarioVehiculos}/>
      </Routes>
    </div>
  );
};

export default Administrador;