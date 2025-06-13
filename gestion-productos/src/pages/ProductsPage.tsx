import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useAuth } from "../utils/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

import { logout } from "../services/auth";
import { getAllProducts, deleteProduct } from "../services/firebase";
import type { Product } from "../types/product";

import FiltersBar from "../components/Product/FiltersBar";
import ProductAccordion from "../components/Product/ProductAccordion";
import ProductTable from "../components/Product/ProductTable";
import ProductsSummary from "../components/Product/ProductsSummary";
import DeleteDialog from "../components/Product/DeleteDialog";
import ProductsChart from "../components/Product/ProductsChart";

const ProductsPage = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");

  const [orderBy, setOrderBy] = useState<keyof Product>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleDelete = async () => {
    if (confirmDeleteId) {
      await deleteProduct(confirmDeleteId);
      setConfirmDeleteId(null);
      const data = await getAllProducts();
      setProducts(data);
      setSnackbarMessage("Producto eliminado con éxito");
      setOpenSnackbar(true);
    }
  };

  const handleSort = (field: keyof Product) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setAccordionOpen(true);
  };

  const categoryList = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
      .filter((p) => (priceMin !== "" ? p.price >= priceMin : true))
      .filter((p) => (priceMax !== "" ? p.price <= priceMax : true))
      .sort((a, b) => {
        const aVal = a[orderBy];
        const bVal = b[orderBy];
        if (typeof aVal === "string" && typeof bVal === "string") {
          return order === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        if (typeof aVal === "number" && typeof bVal === "number") {
          return order === "asc" ? aVal - bVal : bVal - aVal;
        }
        return 0;
      });
  }, [products, searchTerm, categoryFilter, priceMin, priceMax, orderBy, order]);

  const pagedProducts = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredProducts.slice(start, start + rowsPerPage);
  }, [filteredProducts, page, rowsPerPage]);

  const avgPrice = useMemo(() => {
    if (filteredProducts.length === 0) return "0.00";
    return (
      filteredProducts.reduce((acc, p) => acc + p.price, 0) /
      filteredProducts.length
    ).toFixed(2);
  }, [filteredProducts]);

  if (user === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        flexDirection="column"
      >
        <Typography variant="h6" gutterBottom>
          Inicia sesión para visualizar la página
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Ir a iniciar sesión
        </Button>
      </Box>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return (
    <Box sx={{ p: 3, width: "90vw", overflowX: "auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestión de Productos</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>

      <Box sx={{ mb: 2, maxWidth: 300 }}>
        <TextField
          fullWidth
          size="small"
          label="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <FiltersBar
        categories={categoryList}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        onClear={() => {
          setSearchTerm("");
          setCategoryFilter("");
          setPriceMin("");
          setPriceMax("");
        }}
      />

      {productToEdit && (
        <Box mb={1}>
          <Button
            size="small"
            onClick={() => {
              setProductToEdit(null);
              setAccordionOpen(true);
            }}
          >
            + Crear nuevo producto
          </Button>
        </Box>
      )}

      <ProductAccordion
        productToEdit={productToEdit}
        onSaved={() => {
          setProductToEdit(null);
          setAccordionOpen(false);
          const reload = async () => {
            const data = await getAllProducts();
            setProducts(data);
            setSnackbarMessage(
              productToEdit ? "Producto actualizado con éxito" : "Producto creado con éxito"
            );
            setOpenSnackbar(true);
          };
          reload();
        }}
        categories={categoryList}
        expanded={accordionOpen}
        onExpandChange={setAccordionOpen}
      />

      <ProductTable
        products={pagedProducts}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDeleteId(id)}
      />

      <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      <ProductsSummary count={filteredProducts.length} avgPrice={avgPrice} />

      <ProductsChart products={filteredProducts} />

      <DeleteDialog
        open={Boolean(confirmDeleteId)}
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductsPage;
