import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true); // Rastrear el estado de carga
  const [error, setError] = useState(null); // Rastrear errores

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const usuariosCollection = collection(db, 'usuarios');
        const q = query(usuariosCollection, where("rol", "==", "cliente"));
        const querySnapshot = await getDocs(q);
        console.log("Instantánea de consulta:", querySnapshot);
        console.log("Número de documentos:", querySnapshot.docs.length);
        const clientes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientes(clientes);
        setCargando(false);
      } catch (error) {
        setError(error);
        console.error("Error al recuperar clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar clientes: {error.message}</p>;
  }

  return (
    <div>
      <h1>Clientes</h1>
      {clientes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay clientes para mostrar.</p>
      )}
    </div>
  );
};

export default Clientes;