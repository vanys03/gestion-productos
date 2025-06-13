import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import type { Product } from "../../types/product";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type Props = {
  products: Product[];
};

const ProductsChart = ({ products }: Props) => {
  const categoryCounts = products.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(categoryCounts);
  const values = Object.values(categoryCounts);

  const colors = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FE6F61", "#9ACD32", "#4B0082"
  ];

  const pieData = {
    labels,
    datasets: [
      {
        label: "Categoría",
        data: values,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Productos",
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <Box mt={5}>
      <Typography variant="h6" gutterBottom>
        Visualización por categoría
      </Typography>
      <Box
  display="flex"
  flexWrap="wrap"
  gap={4}
  justifyContent="center"
  alignItems="center"
>

        <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
          <Pie data={pieData} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsChart;
