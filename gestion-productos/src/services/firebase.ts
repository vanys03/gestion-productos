
// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

import type { Product } from "../types/product";


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

// 🔹 Obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">)
  }));
};

// 🔹 Obtener un producto por ID
export const getProductById = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...(docSnap.data() as Omit<Product, "id">) };
  }
  return null;
};

// 🔹 Crear un producto
export const createProduct = async (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "products"), {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

// 🔹 Actualizar un producto
export const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, {
    ...updatedFields,
    updatedAt: serverTimestamp()
  });
};

// 🔹 Eliminar un producto
export const deleteProduct = async (id: string) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};
