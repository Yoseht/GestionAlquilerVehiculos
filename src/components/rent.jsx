import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase/firebaseConfig"
import { getAuth } from 'firebase/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Renta = () => {
  const [vehiculo, setVehiculo] = useState({});
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [municipio, setMunicipio] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setVehiculo(location.state.vehiculo);
  }, [location.state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const usuariosCollection = collection(db, 'usuarios');
    const querySnapshot = getDocs(usuariosCollection);
    querySnapshot.then((querySnapshot) => {
      const usuario = querySnapshot.docs.find((doc) => doc.data().uid === auth.currentUser.uid);
      const renta = {
        vehiculo: vehiculo.id,
        usuario: usuario.data().uid,
        nombre,
        apellido,
        direccion,
        telefono,
        municipio,
      };
      const rentasCollection = collection(db, 'rentas');
      addDoc(rentasCollection, renta);
      navigate('/home');
    });
  };

  return (
    <div>
      <h1>Renta de vehículo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Apellido:
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </label>
        <label>
          Dirección:
          <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </label>
        <label>
          Teléfono:
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </label>
        <label>
          Municipio:
          <input type="text" value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
        </label>
        <button type="submit">Rentar</button>
      </form>
    </div>
  );
};

export default Renta;