import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../../services/firebase";
import type { Product } from "../../types/product";

const initialState = {
  name: "",
  category: "",
  price: 0,
  rating: 0,
  stock: 0,
};

type Props = {
  productToEdit: Product | null;
  onSaved: () => void;
  categories: string[];
};

const ProductForm = ({ productToEdit, onSaved, categories }: Props) => {
  const [form, setForm] = useState<Omit<Product, "id" | "createdAt" | "updatedAt">>(
    initialState
  );
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      const { name, category, price, rating, stock } = productToEdit;
      setForm({ name, category, price, rating, stock });
      setIsCustomCategory(!categories.includes(category));
    } else {
      setForm(initialState);
      setIsCustomCategory(false);
    }
  }, [productToEdit, categories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name as string]:
        name === "price" || name === "rating" || name === "stock"
          ? Number(value)
          : value,
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
    setIsCustomCategory(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box sx={{ flex: "1 1 300px" }}>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ flex: "1 1 300px" }}>
          {!isCustomCategory ? (
            <FormControl fullWidth size="small">
              <InputLabel>Categoría</InputLabel>
              <Select
                name="category"
                value={form.category}
                label="Categoría"
                onChange={(e) => {
                  const val = e.target.value as string;
                  if (val === "__custom__") {
                    setForm((prev) => ({ ...prev, category: "" }));
                    setIsCustomCategory(true);
                  } else {
                    setForm((prev) => ({ ...prev, category: val }));
                    setIsCustomCategory(false);
                  }
                }}
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
                <MenuItem value="__custom__">+ Nueva categoría</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <TextField
              label="Nueva categoría"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
              size="small"
              required
              onBlur={() => {
                if (form.category.trim() === "") {
                  setIsCustomCategory(false);
                }
              }}
            />
          )}
        </Box>

        <Box sx={{ flex: "1 1 180px" }}>
          <TextField
            label="Precio"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box sx={{ flex: "1 1 180px" }}>
          <TextField
            label="Calificación"
            name="rating"
            type="number"
            value={form.rating}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            inputProps={{ min: 0, max: 5 }}
          />
        </Box>

        <Box sx={{ flex: "1 1 180px" }}>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            inputProps={{ min: 0 }}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button type="submit" variant="contained" color="primary">
          {productToEdit ? "Actualizar" : "Agregar"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
