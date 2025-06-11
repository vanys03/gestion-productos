// src/components/Product/ProductItem.tsx
import React from "react";
import type { Product } from "../../types/product";
import { deleteProduct } from "../../services/firebase";

const ProductItem: React.FC<{
  product: Product;
  onDeleted: () => void;
  onEdit: (product: Product) => void;
}> = ({ product, onDeleted, onEdit }) => {
  const handleDelete = async () => {
    await deleteProduct(product.id);
    onDeleted();
  };

  return (
    <li>
      <strong>{product.name}</strong> - ${product.price}
      <button onClick={() => onEdit(product)}>Editar</button>
      <button onClick={handleDelete}>Eliminar</button>
    </li>
  );
};

export default ProductItem;
