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
  IconButton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useProducts, useCategoryProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../store/cartStore";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | number>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { getTotalItems } = useCartStore();

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
            Shop Explorer
          </Typography>

          <IconButton
            component={Link}
            to="/cart"
            color="primary"
            size="large"
            sx={{ bgcolor: "background.paper", boxShadow: 3 }}
          >
            <Badge badgeContent={getTotalItems()} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

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

export default HomePage;
