// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto: redirige a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Página de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Página de productos (requiere autenticación, validado dentro del componente) */}
        <Route path="/productos" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
