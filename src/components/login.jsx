import React, { useState } from 'react';
import appFirebase from '../../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import kratos from '../assets/Kratos.png'
import nombre from '../assets/nombre.png';

const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const [name, setName] = useState();
  const [lastname, setLastName] = useState();
  const [id, setId] = useState();

  const functAuthentication = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, correo, contraseña);
        //Aqui se guarda nombre, apellido e identificacion en la base de datos
        console.log('name', name);
        console.log('lastname', lastname);
        console.log('id', id);
      } catch (error) {
        alert('Segurese de que la contraseña tenga mas de 8 caracteres');
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contraseña);
      } catch (error) {
        alert('El correo o la contraseña son incorrectos');
      }
    }
  };

  return (
    <div className="Container">
      <h1 className="text-center">This is the Login</h1>
      <div className="row">
        {/* columna mas pequeña */}
        <div className="col-md-4">
          <div className="padre">
            <div className="card  card-body shadow-lg">
              <img src={kratos} alt="" className="estilo-profile" />
              <form onSubmit={functAuthentication}>
                {registrando && (
                  <>
                    <input type="text" placeholder="Ingresar nombre" className="cajaTexto" id="nombre" onChange={(e) => setName(e.target.value)}></input>
                    <input type="text" placeholder="Ingresar apellido" className="cajaTexto" id="apellido" onChange={(e) => setLastName(e.target.value)}></input>
                    <input type="text" placeholder="Ingresar identificacion" className="cajaTexto" id="identificacion" value={id} onChange={(e) => setId(e.target.value)}></input>
                  </>
                )}
                <input type="text" placeholder="Ingresar Email" className="cajaTexto" id="email" />
                <input type="password" placeholder="Ingresar Contraseña" className="cajaTexto" id="password" />

                <button className="btnform">{registrando ? "Registrate" : "Inicia Sesion"}</button>
              </form>
              <h4 className="texto">{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"} <button className="btnswitch" onClick={() => setRegistrando(!registrando)}>{registrando ? "Inicia Sesion" : "Registrate"}</button></h4>
            </div>
          </div>
        </div>
        {/* columna mas grande */}
        <div className="col-md-8">
          <img src={nombre} alt="" className="tamaño-imagen" />
        </div>
      </div>
    </div>
  );
};

export default Login;