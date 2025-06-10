// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXyPtvHo2bjp26dNsg-3llKwEvL-Q4ykw",
  authDomain: "gestion-productos-aa5c3.firebaseapp.com",
  projectId: "gestion-productos-aa5c3",
  storageBucket: "gestion-productos-aa5c3.firebasestorage.app",
  messagingSenderId: "427192948318",
  appId: "1:427192948318:web:8e495cdbfb89e3c7fa06cf",
  measurementId: "G-VFGJF1J84Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };  
