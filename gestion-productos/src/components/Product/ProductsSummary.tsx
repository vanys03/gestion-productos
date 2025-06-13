import { Box, Typography } from "@mui/material";

type Props = {
  count: number;
  avgPrice: string;
};

const ProductsSummary = ({ count, avgPrice }: Props) => (
  <Box mt={3}>
    <Typography variant="subtitle1">
      Productos mostrados: {count}
    </Typography>
    <Typography variant="subtitle1">
      Precio promedio: ${avgPrice}
    </Typography>
  </Box>
);

export default ProductsSummary;
