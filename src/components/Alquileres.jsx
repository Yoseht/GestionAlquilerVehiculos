import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Alquileres = () => {
  const [alquileres, setAlquileres] = useState([]);

  useEffect(() => {
    const alquileresCollection = collection(db, 'rentas');
    const querySnapshot = getDocs(alquileresCollection);
    querySnapshot.then((querySnapshot) => {
      const alquileres = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAlquileres(alquileres);
    });
  }, []);

  return (
    <div>
      <h1>Alquileres</h1>
      <ul>
        {alquileres.map((alquiler) => (
          <li key={alquiler.id}>
            <h2>Alquiler {alquiler.id}</h2>
            <p>Usuario: {alquiler.usuario}</p>
            <p>Vehículo: {alquiler.vehiculo}</p>
            <p>Fecha de alquiler: {alquiler.fechaAlquiler}</p>
            <p>Fecha de devolución: {alquiler.fechaDevolucion}</p>
            <p>Número de licencia: {alquiler.numeroLicencia}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alquileres;