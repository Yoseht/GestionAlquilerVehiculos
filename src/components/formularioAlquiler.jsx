import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';

const Alquileres = () => {
  const [alquileres, setAlquileres] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [vehiculos, setVehiculos] = useState({});

  useEffect(() => {
    const rentasCollection = collection(db, 'rentas');
    const unsubscribe = onSnapshot(rentasCollection, (querySnapshot) => {
      const alquileres = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAlquileres(alquileres);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const usuariosCollection = collection(db, 'usuarios');
    const usuariosSnapshot = getDocs(usuariosCollection);
    usuariosSnapshot.then((querySnapshot) => {
      const usuarios = {};
      querySnapshot.docs.forEach((doc) => {
        usuarios[doc.id] = doc.data();
      });
      setUsuarios(usuarios);
    });
  }, []);

  useEffect(() => {
    const vehiculosCollection = collection(db, 'vehiculos');
    const vehiculosSnapshot = getDocs(vehiculosCollection);
    vehiculosSnapshot.then((querySnapshot) => {
      const vehiculos = {};
      querySnapshot.docs.forEach((doc) => {
        vehiculos[doc.id] = doc.data();
      });
      setVehiculos(vehiculos);
    });
  }, []);

  return (
    <div>
      <h1>Alquileres</h1>
      <ul>
        {alquileres.map((alquiler) => (
          <li key={alquiler.id}>
            <h2>
              {usuarios[alquiler.usuario] ? `${usuarios[alquiler.usuario].nombre} ${usuarios[alquiler.usuario].apellido}` : 'Usuario no encontrado'} - 
              {vehiculos[alquiler.vehiculo] ? `${vehiculos[alquiler.vehiculo].marca} ${vehiculos[alquiler.vehiculo].modelo}` : 'Vehículo no encontrado'}
            </h2>
            <p>
              Fecha de alquiler: {alquiler.fechaAlquiler} - Fecha de devolución: {alquiler.fechaDevolucion}
            </p>
            <p>
              Número de licencia: {alquiler.numeroLicencia} - Lugar de solicitud: {alquiler.lugarSolicitud}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alquileres;