import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Box,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "../../types/product";

type Props = {
  products: Product[];
  order: "asc" | "desc";
  orderBy: keyof Product;
  onSort: (field: keyof Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const columns: { id: keyof Product | "actions"; label: string }[] = [
  { id: "name", label: "Nombre" },
  { id: "category", label: "Categoría" },
  { id: "price", label: "Precio" },
  { id: "rating", label: "Calificación" },
  { id: "stock", label: "Stock" },
  { id: "actions", label: "Acciones" },
];

const ProductTable = ({ products, order, orderBy, onSort, onEdit, onDelete }: Props) => (
  <TableContainer component={Paper} sx={{ minWidth: "1000px", width: "100%" }}>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id}>
              {column.id !== "actions" ? (
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => onSort(column.id as keyof Product)}
                >
                  {column.label}
                </TableSortLabel>
              ) : (
                column.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.rating}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <Box display="flex" gap={1}>
                <IconButton size="small" onClick={() => onEdit(product)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(product.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ProductTable;
