import React, { useState } from 'react';

const FormularioAlquiler = ({ vehiculo, handleRenta }) => {
  const [numeroLicencia, setNumeroLicencia] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fechaAlquiler, setFechaAlquiler] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const datosAlquiler = {
      numeroLicencia,
      ubicacion,
      fechaAlquiler,
      fechaDevolucion,
    };
    handleRenta(datosAlquiler);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulario de alquiler de vehículo</h2>
      <label>
        Número de licencia:
        <input
          type="text"
          value={numeroLicencia}
          onChange={(event) => setNumeroLicencia(event.target.value)}
        />
      </label>
      <br />
      <label>
        Ubicación:
        <input
          type="text"
          value={ubicacion}
          onChange={(event) => setUbicacion(event.target.value)}
        />
      </label>
      <br />
      <label>
        Fecha de alquiler:
        <input
          type="date"
          value={fechaAlquiler}
          onChange={(event) => setFechaAlquiler(event.target.value)}
        />
      </label>
      <br />
      <label>
        Fecha de devolución:
        <input
          type="date"
          value={fechaDevolucion}
          onChange={(event) => setFechaDevolucion(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Rentar vehículo</button>
    </form>
  );
};

export default FormularioAlquiler;