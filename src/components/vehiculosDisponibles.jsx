import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import FormularioAlquiler from './formularioAlquiler';

const auth = getAuth();

const VehiculosDisponibles = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const vehiculosCollection = collection(db, 'vehiculos');
    const querySnapshot = getDocs(vehiculosCollection);
    querySnapshot.then((querySnapshot) => {
      const vehiculos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setVehiculos(vehiculos);
    });
  }, []);

  const handleRenta = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setShowFormulario(true);
  };

  const handleRentaSubmit = (datosAlquiler) => {
    const rentasCollection = collection(db, 'rentas');
    const renta = {
      usuario: auth.currentUser.uid,
      vehiculo: vehiculoSeleccionado.id,
      fechaAlquiler: datosAlquiler.fechaAlquiler,
      fechaDevolucion: datosAlquiler.fechaDevolucion,
      numeroLicencia: datosAlquiler.numeroLicencia,
      fechaInicio: new Date(),
    };
    addDoc(rentasCollection, renta).then(() => {
      const vehiculoRef = doc(db, 'vehiculos', vehiculoSeleccionado.id);
      const vehiculoActualizado = { ...vehiculoSeleccionado, disponible: false };
      updateDoc(vehiculoRef, vehiculoActualizado).then(() => {
        setMensaje(`El vehículo ${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo} ha sido rentado`);
        setTimeout(() => {
          setMensaje('');
        }, 3000);
      });
    });
  };

  return (
    <div>
      <h1>Vehículos disponibles</h1>
      <ul>
        {vehiculos.map((vehiculo) => (
          <li key={vehiculo.id}>
            <h2>{vehiculo.marca} {vehiculo.modelo}</h2>
            <p>{vehiculo.descripcion}</p>
            <img src={vehiculo.imagen} alt={vehiculo.modelo} style={{ width: '100px', height: '100px' }} />
            {vehiculo.disponible ? (
              <button onClick={() => handleRenta(vehiculo)}>Rentar</button>
            ) : (
              <p>No disponible</p>
            )}
          </li>
        ))}
      </ul>
      {showFormulario && (
        <FormularioAlquiler
          vehiculo={vehiculoSeleccionado}
          handleRenta={handleRentaSubmit}
        />
      )}
      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
    </div>
  );
};

export default VehiculosDisponibles;