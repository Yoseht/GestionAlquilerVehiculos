import React,{useState,useEffect} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const Clientes = () => {
    const [clientes, setClientes] = useState ([]);

    useEffect(()=>{
        const usuariosCollection = collection(db,'usuarios');
        const q = query(usuariosCollection, where("rol", "==", "cliente"));
        const getClientes = async ()=>{
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            const clientes=querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data}));
            setClientes(clientes);
        };
        getClientes();
    }, []);

    return(
        <div>
            <h1>Clientes</h1>
            {clientes.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((clientes) =>(
                            <tr key={clientes.id}>
                                <td>{clientes.nombre}</td>
                                <td>{clientes.apellido}</td>
                                <td>{clientes.correo}</td>
                                <td>{clientes.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
}
export default Clientes;