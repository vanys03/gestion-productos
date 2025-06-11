// src/components/Product/ProductList.tsx
import React, { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { getAllProducts } from "../../services/firebase";
import ProductItem from "./ProductItem";

const ProductList: React.FC<{
  onEdit: (product: Product) => void;
}> = ({ onEdit }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDeleted={fetchProducts}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
