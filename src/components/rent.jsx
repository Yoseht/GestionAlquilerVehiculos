import React, { useState } from 'react';
import appFirebase from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
const auth = getAuth(appFirebase);

const Renta = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [municipio, setMunicipio] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      nombre,
      apellido,
      direccion,
      telefono,
      municipio,
    });
  };

  return (
    <>
      <header className="header">
        <div className="container-header">
          <div className="nav-buttons">
            <button className="btn">Buscar</button>
            <button className="btn">Ofertas</button>
            <button className="btn">Contacto</button>
          </div>
          <button className="btn login-btn">Inicio de Sesión</button>
        </div>
      </header>
      <div className="Container">
        <div className="padre">
          <div className="card card-body">
            <h2>Formulario de Renta</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                className="cajaTexto"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido"
                className="cajaTexto"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
              />
              <input
                type="text"
                placeholder="Dirección"
                className="cajaTexto"
                value={direccion}
                onChange={(event) => setDireccion(event.target.value)}
              />
              <input
                type="text"
                placeholder="Teléfono"
                className="cajaTexto"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
              />
              <select
                className="cajaTexto"
                value={municipio}
                onChange={(event) => setMunicipio(event.target.value)}
              >
                <option value="Medellín">Medellín</option>
                <option value="Bello">Bello</option>
                <option value="Itagüí">Itagüí</option>
              </select>
              <button className="btnform">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Renta;
