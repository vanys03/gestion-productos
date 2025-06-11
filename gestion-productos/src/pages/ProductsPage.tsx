// src/pages/ProductsPage.tsx
import React, { useState } from "react";
import ProductList from "../components/Product/ProductList";
import ProductForm from "../components/Product/ProductForm";
import type { Product } from "../types/product";

const ProductsPage: React.FC = () => {
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
  };

  const handleSaved = () => {
    setProductToEdit(null);
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <ProductForm productToEdit={productToEdit} onSaved={handleSaved} />
      <ProductList onEdit={handleEditProduct} />
    </div>
  );
};

export default ProductsPage;
