import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

const Login = () => {
  const navigate = useNavigate();
  const [registrando, setRegistrando] = useState(false);
  const [rol, setRol] = useState('');
  const [campos, setCampos] = useState({});

  const functAuthentication = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    if (registrando) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
        const usuario = {
          uid: userCredential.user.uid,
          rol: rol,
          ...campos,
        };
        const usuariosCollection = collection(db, 'usuarios');
        await addDoc(usuariosCollection, usuario);
        console.log('Usuario registrado con éxito');
        navigate('/home');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
        const user = userCredential.user;
        const usuariosCollection = collection(db, 'usuarios');
        const querySnapshot = await getDocs(usuariosCollection);
        const usuario = querySnapshot.docs.find((doc) => doc.data().uid === user.uid);
        if (usuario.data().rol === 'administrador') {
          navigate('/admin');
        } else if (usuario.data().rol === 'cliente') {
          navigate('/home');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  };

  const handleRolChange = (e) => {
    setRol(e.target.value);
  };

  const handleCampoChange = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Formulario de autenticación */}
      <div>
        <form onSubmit={functAuthentication}>
          {registrando && (
            <>
              <select value={rol} onChange={handleRolChange}>
                <option value="">Seleccione un rol</option>
                <option value="administrador">Administrador</option>
                <option value="cliente">Cliente</option>
              </select>
              {rol === 'administrador' && (
                <>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={campos.nombre}
                    onChange={handleCampoChange}
                  />
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={campos.apellido}
                    onChange={handleCampoChange}
                  />
                  <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={campos.correo}
                    onChange={handleCampoChange}
                  />
                  <input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={campos.contraseña}
                    onChange={handleCampoChange}
                  />
                  <input
                    type="text"
                    name="inventario"
                    placeholder="Inventario"
                    value={campos.inventario}
                    onChange={handleCampoChange}
                  />
                </>
              )}
              {rol === 'cliente' && (
                <>
                  <input
                    type="text"
                    name="identificacion"
                    placeholder="Identificación"
                    value={campos.identificacion}
                    onChange={handleCampoChange}
                  />
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={campos.nombre}
                    onChange={handleCampoChange}
                  />
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={campos.apellido}
                    onChange={handleCampoChange}
                  />
                  <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={campos.correo}
                    onChange={handleCampoChange}
                  />
                  <input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={campos.contraseña}
                    onChange={handleCampoChange}
                  />
                </>
              )}
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            id="email"
          />
          <input
            type="password"
            placeholder="Contraseña"
            id="password"
          />

          <button type="submit">
            {registrando ? 'Registrar' : 'Iniciar sesión'}
          </button>
        </form>
      </div>

      {/* Botón para cambiar entre registro e inicio de sesión */}
      <button onClick={() => setRegistrando(!registrando)}>
        {registrando ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </>
  );
};

export default Login;