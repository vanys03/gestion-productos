import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

type Props = {
  categories: string[];
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  priceMin: number | "";
  priceMax: number | "";
  onPriceMinChange: (val: number | "") => void;
  onPriceMaxChange: (val: number | "") => void;
  onClear: () => void;
};

const FiltersBar = ({
  categories,
  categoryFilter,
  onCategoryChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  onClear,
}: Props) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
      <Box sx={{ width: { xs: "100%", sm: "220px" } }}>
        <FormControl fullWidth size="small">
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoryFilter}
            label="Categoría"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: { xs: "100%", sm: "180px" } }}>
        <TextField
          label="Precio Mínimo"
          type="number"
          size="small"
          fullWidth
          value={priceMin}
          onChange={(e) =>
            onPriceMinChange(e.target.value === "" ? "" : +e.target.value)
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>

      <Box sx={{ width: { xs: "100%", sm: "180px" } }}>
        <TextField
          label="Precio Máximo"
          type="number"
          size="small"
          fullWidth
          value={priceMax}
          onChange={(e) =>
            onPriceMaxChange(e.target.value === "" ? "" : +e.target.value)
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>

      <Box sx={{ width: { xs: "100%", sm: "160px" } }}>
        <Button fullWidth variant="outlined" size="small" onClick={onClear}>
          Limpiar filtros
        </Button>
      </Box>
    </Box>
  );
};

export default FiltersBar;
