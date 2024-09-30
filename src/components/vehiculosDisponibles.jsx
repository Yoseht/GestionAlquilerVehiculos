import React,{useState,useEffect} from "react";
import{auth, db} from '../firebase/firebaseConfig'
import { collection,getDocs, updateDoc,doc, addDoc } from "firebase/firestore";

const vehiculosDisponibles = () =>{
    const[vehiculos, setVehiculos] = useState([]);
    const[mensaje, setMensaje] = useState('');

    useEffect(() =>{
        const vehiculosCollectionRef = collection(db, 'vehiculos');
        const getVehiculos = async () => {
            const querySnapshot = await getDocs(vehiculosCollectionRef);
            const vehiculos = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            setVehiculos(vehiculos);
        };
        getVehiculos();
    }, []);
    const handleRentar = async (vehiculo) =>{
        const vehiculoRef = doc(db,'vehiculos',vehiculo.id);
        const vehiculoActualizado = {...vehiculo, disponible: false};
        await updateDoc(vehiculoRef, vehiculoActualizado);

        const rentasCollection = collection(db, 'rentas');
        const renta = {
            usuario: auth.currentUser.uid,
            vehiculo: vehiculo.id,
        };
        await addDoc(rentasCollection, renta)
        setMensaje(`El vehículo ${vehiculo.marca} ${vehiculo.modelo} ha sido rentado`);
        setTimeout(()=>{
            setMensaje('');
        },3000);
    }
    return(
        <div>
            <h1>Vehiculos Disponibles</h1>
            <ul>
                {vehiculos.map((vehiculo)=>(
                    <li key={vehiculo.id}>
                        <h2>{vehiculo.marca}{vehiculo.modelo}</h2>
                        <p>{vehiculo.descripcion}</p>
                        <img src={vehiculo.imagen} alt={vehiculo.modelo} style={{width: '100px',height: '100px'}}/>
                        {vehiculo.disponible !== undefined ? (
                             vehiculo.disponible ? (
                                <button onClick={() => handleRentar(vehiculo)}>Rentar</button>
                            ) : (
                                 <p>No disponible</p>
                                )
                            ) : (
                                 <p>No disponible</p>
                                )}
                    </li>
                ))}
            </ul>
            {mensaje && <p style={{color: 'red'}}>{mensaje}</p>}
        </div>
    );
};
export default vehiculosDisponibles;