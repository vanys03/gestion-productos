import { initializeApp } from "firebase/app";  
import { getFirestore, collection, getDocs } from "firebase/firestore";  

const firebaseConfig = {
  apiKey: "AIzaSyBUQCEm20n8TeHpt5QftgPQ0NgXOXBgo0U",
  authDomain: "gestion-productos-a011b.firebaseapp.com",
  projectId: "gestion-productos-a011b",
  storageBucket: "gestion-productos-a011b.appspot.com",
  messagingSenderId: "539725094851",
  appId: "1:539725094851:web:fff1618b10a874ae7ea776",
  measurementId: "G-L7ECGWFE0E"
};

const app = initializeApp(firebaseConfig);  
const db = getFirestore(app);  

export { db };  

// 🔹 Función temporal para probar la conexión con Firebase  
const testFirebaseConnection = async () => {  
  try {  
    const snapshot = await getDocs(collection(db, "products"));  
    if (!snapshot.empty) {  
      console.log("✅ Conexión exitosa con Firebase. Datos encontrados:");  
      snapshot.docs.forEach(doc => console.log(doc.data()));  
    } else {  
      console.log("⚠️ Conexión establecida, pero no hay datos en Firestore.");  
    }  
  } catch (error) {  
    console.error("❌ Error al conectar con Firebase:", error);  
  }  
};  

// 🔹 Ejecutar la prueba al iniciar la aplicación  
testFirebaseConnection();
