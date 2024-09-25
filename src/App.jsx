import { useState } from 'react' 
//importando los modulos de firebase
import appFirebase from '../firebaseConfig'
import {getAuth,onAuthStateChanged} from 'firebase/auth'


const auth = getAuth(appFirebase)

//importando los componentes
import Login from './components/login'
import Home from './components/home'

import './App.css'

function App() {
 
  const [usuario, setUsuario] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if(usuarioFirebase){
      setUsuario(usuarioFirebase)
  }else{
    setUsuario(null)
    }
  })
  return(
    <div>
      {usuario ? <Home correoUsuario = {usuario.email}/> : <Login/>}
    </div>
  )
}

export default App



