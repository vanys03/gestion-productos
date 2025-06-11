// src/components/Product/ProductForm.tsx
import React, { useState, useEffect } from "react";
import type { Product } from "../../types/product";
import { createProduct, updateProduct } from "../../services/firebase";

const initialState = {
  name: "",
  category: "",
  price: 0,
  rating: 0,
  stock: 0
};

const ProductForm: React.FC<{
  productToEdit: Product | null;
  onSaved: () => void;
}> = ({ productToEdit, onSaved }) => {
  const [form, setForm] = useState<Omit<Product, "id" | "createdAt" | "updatedAt">>(initialState);

  useEffect(() => {
    if (productToEdit) {
      const { name, category, price, rating, stock } = productToEdit;
      setForm({ name, category, price, rating, stock });
    } else {
      setForm(initialState);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" || name === "stock" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productToEdit) {
      await updateProduct(productToEdit.id, form);
    } else {
      await createProduct(form);
    }
    onSaved();
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{productToEdit ? "Editar" : "Nuevo"} Producto</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Categoría"
        required
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        type="number"
        placeholder="Precio"
        required
      />
      <input
        name="rating"
        value={form.rating}
        onChange={handleChange}
        type="number"
        placeholder="Rating"
        required
      />
      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        type="number"
        placeholder="Stock"
        required
      />
      <button type="submit">{productToEdit ? "Actualizar" : "Crear"}</button>
    </form>
  );
};

export default ProductForm;
