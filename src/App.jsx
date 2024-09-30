import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/login';
import Home from './components/home';
import Admin from './components/administrador'
import Clientes from './components/clientes';
import VehiculosDisponibles from './components/vehiculosDisponibles';
import MisRentas from './components/misRentas';

import RegistroUsuario from './components/RegistroUsuario';
import { auth } from './firebase/firebaseConfig';
import InventarioVehiculos from './components/inventarioVehiculos';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      console.log('estado de usuario: ', usuarioFirebase)
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });
    return unsuscribe;
  }, []);

  const handleRentaClick = () => {
    setShowRenta(true);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/*" element={<Admin />}/>
        <Route path="admin/vehiculos" element={<InventarioVehiculos />} />
        <Route path="admin/usuarios" element={<Clientes />} />
        <Route path="cliente/vehiculos" element={<VehiculosDisponibles/>}/>
        <Route path="cliente/alquileres" element={<MisRentas/>}/>
        <Route path="*" element={<div>No encontrado</div>} />
      </Routes>
    </BrowserRouter>
  );
  
  }

export default App;