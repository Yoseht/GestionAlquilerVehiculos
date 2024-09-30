import React, {useState, useEffect} from "react";
import {db} from '../firebase/firebaseConfig';
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage,ref as storageRef,uploadBytes,getDownloadURL } from "firebase/storage";

const storage = getStorage();
const InventarioVehiculos = () =>{
    const [vehiculos, setVehiculos] = useState([]);
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [año, setAño] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenUrl, setImagenUrl] = useState('');
    const [vehiculoEditar, setVehiculoEditar] = useState(null);

    useEffect(()=>{
        const vehiculosCollection = collection(db, 'vehiculos');
        const getVehiculos = async ()=>{
            const querySnapshot = await getDocs(vehiculosCollection);
            const vehiculos = querySnapshot.docs.map((doc)=> ({id: doc.id, ...doc.data()}));
            setVehiculos(vehiculos)
        };
        getVehiculos();
    }, []);

    const handleAgregarVehiculo = async () => {
        try {
          const vehiculosCollection = collection(db, 'vehiculos');
          await addDoc(vehiculosCollection, {
            marca: marca,
            modelo: modelo,
            año: año,
            descripcion: descripcion,
            imagen: imagenUrl,
          });
          setMarca('');
          setModelo('');
          setAño('');
          setDescripcion('');
          setImagen(null);
          setImagenUrl('');
          window.location.reload();
        } catch (error) {
          console.error('Error al agregar vehículo:', error);
        }
      };
    
      const handleSubirImagen = async () => {
        try {
          const storageRefImagen = storageRef(storage, `vehiculos/${imagen.name}`);
          await uploadBytes(storageRefImagen, imagen);
          const urlImagen = await getDownloadURL(storageRefImagen);
          setImagenUrl(urlImagen);
        } catch (error) {
          console.error('Error al subir imagen:', error);
        }
      };
    
      const handleEditarVehiculo = (vehiculo) => {
        setVehiculoEditar(vehiculo);
        setMarca(vehiculo.marca);
        setModelo(vehiculo.modelo);
        setAño(vehiculo.año);
        setDescripcion(vehiculo.descripcion);
        setImagenUrl(vehiculo.imagen);
      };
    
      const handleGuardarEdicion = async () => {
        try {
          const vehiculosCollection = collection(db, 'vehiculos');
          const vehiculoRef = doc(vehiculosCollection, vehiculoEditar.id);
          await updateDoc(vehiculoRef, {
            marca: marca,
            modelo: modelo,
            año: año,
            descripcion: descripcion,
            imagen: imagenUrl,
          });
          setVehiculoEditar(null);
          setMarca('');
          setModelo('');
          setAño('');
          setDescripcion('');
          setImagen(null);
          setImagenUrl('');
          window.location.reload();
        } catch (error) {
          console.error('Error al editar vehículo:', error);
        }
      };
    
      const handleEliminarVehiculo = async (vehiculo) => {
        try {
          if (vehiculo.id) {
            const vehiculosCollection = collection(db, 'vehiculos');
            const vehiculoRef = doc(vehiculosCollection, vehiculo.id);
            await deleteDoc(vehiculoRef);
            window.location.reload();
          } else {
            console.error('Error al eliminar vehículo: La propiedad id es undefined');
          }
        } catch (error) {
          console.error('Error al eliminar vehículo:', error);
        }
      };
    

    return(
        <div>
            <h1>Inventario De Vehiculos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Descripcion</th>
                        <th>Imagen</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map((vehiculo)=>(
                        <tr key={vehiculo.id}>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.año}</td>
                            <td>{vehiculo.descripcion}</td>
                            <td><img src={vehiculo.imagen} alt={vehiculo.modelo} /></td>
                            <td><button type="button" onClick={() => handleEditarVehiculo(vehiculo)}>  Editar</button></td>
                            <td><button type="button" onClick={() => handleEliminarVehiculo(vehiculo)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Agregar Vehiculo</h2>
            <form>
            <label>
          Marca:
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
        </label>
        <label>
          Modelo:
          <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
        </label>
        <label>
          Año:
          <input type="number" value={año} onChange={(e) => setAño(e.target.value)} />
        </label>
        <label>
          Descripción:
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <label>
          Imagen:
          <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
        </label>
        <button type="button" onClick={handleSubirImagen}>
          Subir imagen
        </button>
        <button type="button" onClick={handleAgregarVehiculo}>
          Agregar vehículo
        </button>
        </form>
        {vehiculoEditar && (
        <div>
          <h2>Editar vehículo</h2>
          <form>
            <label>
              Marca:
              <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
            </label>
            <label>
              Modelo:
              <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
            </label>
            <label>
              Año:
              <input type="number" value={año} onChange={(e) => setAño(e.target.value)} />
            </label>
            <label>
              Descripción:
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </label>
            <label>
              Imagen:
              <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
            </label>
            <button type="button" onClick={handleSubirImagen}>
              Subir imagen
            </button>
            <button type="button" onClick={handleGuardarEdicion}>
              Guardar edición
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InventarioVehiculos;