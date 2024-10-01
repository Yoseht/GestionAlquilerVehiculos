import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { Link, Route, useNavigate, Routes } from 'react-router-dom';
import Clientes from './clientes';
import InventarioVehiculos from './inventarioVehiculos';
import Alquileres from './Alquileres';
import '../app.css'; // Asegúrate de importar el CSS

const auth = getAuth();
const Administrador = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="welcome-message">
        <h1>Bienvenido, Administrador</h1>
        <p>Esta es la página de administrador de la aplicación.</p>
      </div>
      <div className="admin-form">
        <ul className="admin-links">
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
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <Routes>
        <Route path='/admin/usuarios' element={<Clientes />} />
        <Route path='/admin/vehiculos' element={<InventarioVehiculos />} />
        <Route path='/admin/alquileres' element={<Alquileres />} />
      </Routes>
    </div>
  );
};

export default Administrador;
