import React, { useState, useEffect } from 'react';
import appFirebase from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/login';
import Home from './components/home';
import Renta from './components/rent';

const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);
  const [showRenta, setShowRenta] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });
    return unsuscribe;
  }, []);

  const handleRentaClick = () => {
    setShowRenta(true);
  };

  return (
    <div>
      {usuario ? (
        showRenta ? (
          <Renta />
        ) : (
          <Home correoUsuario={usuario.email} setShowRenta={handleRentaClick} />
        )
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
