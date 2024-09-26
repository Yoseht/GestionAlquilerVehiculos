import React, { useState } from 'react';

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
    <div>
      <h2>Formulario de Renta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} />
          <br />
          <label>Apellido:</label>
          <input type="text" value={apellido} onChange={(event) => setApellido(event.target.value)} />
          <br />
          <label>Dirección:</label>
          <input type="text" value={direccion} onChange={(event) => setDireccion(event.target.value)} />
          <br />
          <label>Teléfono:</label>
          <input type="text" value={telefono} onChange={(event) => setTelefono(event.target.value)} />
          <br />
          <label>Municipio:</label>
          <select value={municipio} onChange={(event) => setMunicipio(event.target.value)}>
            <option value="Medellín">Medellín</option>
            <option value="Bello">Bello</option>
            <option value="Itagüí">Itagüí</option>
          </select>
          <br />
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};
export default Renta;