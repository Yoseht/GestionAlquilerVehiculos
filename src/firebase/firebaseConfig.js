import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuzGFNpiT0eHbSCZgDvQw3cRQLD8GKwxs",
  authDomain: "alquilervehiculos-44eeb.firebaseapp.com",
  databaseURL: "https://alquilervehiculos-44eeb-default-rtdb.firebaseio.com",
  projectId: "alquilervehiculos-44eeb",
  storageBucket: "alquilervehiculos-44eeb.appspot.com",
  messagingSenderId: "670425410141",
  appId: "1:670425410141:web:eedc1dc88fee667e97bbb4",
  measurementId: "G-YS3G4QQWZ1"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
export const auth = getAuth(appFirebase);

// Configura las claims
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      if (idTokenResult.claims.rol) {
        // La propiedad rol existe
      } else {
        // La propiedad rol no existe
      }
    });
  }
});