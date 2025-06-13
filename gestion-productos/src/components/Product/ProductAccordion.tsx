import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductForm from "./ProductForm";
import type { Product } from "../../types/product";

type Props = {
  productToEdit: Product | null;
  onSaved: () => void;
  categories: string[];
  expanded: boolean;
  onExpandChange: (open: boolean) => void;
};

const ProductAccordion = ({
  productToEdit,
  onSaved,
  categories,
  expanded,
  onExpandChange,
}: Props) => (
  <Accordion
    sx={{ mb: 3 }}
    expanded={expanded}
    onChange={(_, newExpanded) => onExpandChange(newExpanded)}
  >
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{productToEdit ? "Editar producto" : "Agregar producto"}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <ProductForm
        productToEdit={productToEdit}
        onSaved={onSaved}
        categories={categories}
      />
    </AccordionDetails>
  </Accordion>
);


export default ProductAccordion;
