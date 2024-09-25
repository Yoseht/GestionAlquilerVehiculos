// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;