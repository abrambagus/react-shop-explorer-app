import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProducts, useCategoryProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | number>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCategoryChange = (event: SelectChangeEvent<string | number>) => {
    setSelectedCategory(event.target.value);
  };

  const {
    data: productsData,
    isLoading: productsLoading,
    isSuccess: productsSuccess,
  } = useProducts({
    title: searchQuery,
    categoryId: Number(selectedCategory),
  });

  const { data: categories } = useCategoryProducts();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Shop Explorer
        </Typography>

        <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            sx={{ backgroundColor: "white" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl sx={{ minWidth: 200, backgroundColor: "white" }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {Array.isArray(productsData) && productsSuccess ? (
            productsData?.map((product) => (
              <Grid key={product.id} size={6}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : productsLoading ? (
            <Grid
              size={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            <Alert severity="error">No products found</Alert>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
