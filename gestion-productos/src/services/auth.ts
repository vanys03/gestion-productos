// src/services/auth.ts
import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

/**
 * Registra un nuevo usuario con email y contraseña.
 * Firebase requiere al menos 6 caracteres para la contraseña.
 */
export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

/**
 * Inicia sesión con un usuario registrado.
 */
export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

/**
 * Cierra sesión del usuario actual.
 */
export const logout = () => signOut(auth);

/**
 * Suscribe una función callback para detectar cambios en el estado de autenticación.
 */
export const subscribeToAuth = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
