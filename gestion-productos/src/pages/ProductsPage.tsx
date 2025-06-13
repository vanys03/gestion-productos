import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  getAllProducts,
  deleteProduct,
} from "../services/firebase";
import type { Product } from "../types/product";
import ProductAccordion from "../components/Product/ProductAccordion";
import ProductTable from "../components/Product/ProductTable";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [orderBy, setOrderBy] = useState<keyof Product>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Filtros
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const categoryList = useMemo(() => {
  return Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
}, [products]);


  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    loadProducts();
  };

  const handleSort = (field: keyof Product) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => categoryFilter ? p.category === categoryFilter : true)
      .filter(p => priceMin !== "" ? p.price >= priceMin : true)
      .filter(p => priceMax !== "" ? p.price <= priceMax : true)
      .sort((a, b) => {
        const valA = a[orderBy];
        const valB = b[orderBy];
        if (typeof valA === "string" && typeof valB === "string") {
          return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (typeof valA === "number" && typeof valB === "number") {
          return order === "asc" ? valA - valB : valB - valA;
        }
        return 0;
      });
  }, [products, categoryFilter, priceMin, priceMax, orderBy, order]);

  const avgPrice = useMemo(() => {
    if (filteredProducts.length === 0) return 0;
    return (
      filteredProducts.reduce((acc, p) => acc + p.price, 0) / filteredProducts.length
    ).toFixed(2);
  }, [filteredProducts]);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Box sx={{ p: 3, width: "90vw", overflowX: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>

      {/* Filtros */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Box sx={{ width: { xs: "100%", sm: "220px" } }}>
          <FormControl fullWidth size="small">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={categoryFilter}
              label="Categoría"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {Array.from(new Set(products.map(p => p.category))).map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "180px" } }}>
          <TextField
            label="Precio Mínimo"
            type="number"
            fullWidth
            size="small"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value === "" ? "" : +e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "180px" } }}>
          <TextField
            label="Precio Máximo"
            type="number"
            fullWidth
            size="small"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value === "" ? "" : +e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "160px" } }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => {
              setCategoryFilter("");
              setPriceMin("");
              setPriceMax("");
            }}
          >
            Limpiar filtros
          </Button>
        </Box>
      </Box>

      {/* Acordeón para agregar producto */}
     <ProductAccordion
  productToEdit={productToEdit}
  onSaved={() => {
    setProductToEdit(null);
    loadProducts();
  }}
  categories={categoryList}
/>
     {/* Tabla */}
<Box sx={{ width: { xs: "100%", sm: "180px" } }}>
  <ProductTable
        products={filteredProducts}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
        onEdit={setProductToEdit}
        onDelete={handleDelete}
        
      />
</Box>
 
      

      {/* Resumen */}
      <Box mt={3}>
        <Typography variant="subtitle1">
          Productos mostrados: {filteredProducts.length}
        </Typography>
        <Typography variant="subtitle1">
          Precio promedio: ${avgPrice}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductsPage;
