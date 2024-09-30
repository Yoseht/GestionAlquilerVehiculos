import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

const Alquileres = () => {
  const [alquileres, setAlquileres] = useState([]);

  useEffect(() => {
    const rentasCollection = collection(db, 'rentas');
    const unsubscribe = onSnapshot(rentasCollection, (querySnapshot) => {
      const alquileres = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAlquileres(alquileres);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Alquileres</h1>
      <ul>
        {alquileres.map((alquiler) => (
          <li key={alquiler.id}>
            <h2>
              {alquiler.usuario} - {alquiler.vehiculo}
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