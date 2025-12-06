import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Card,
  CardMedia,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useProduct } from "../hooks/useProducts";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types/product";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { setAddToCart } = useCartStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = (product: Product) => {
    setAddToCart(product);
    setOpenSnackbar(true);
  };

  const { data: product, isLoading, isError, error } = useProduct(productId);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load product"}
        </Alert>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!product) {
    return <Alert severity="warning">Product not found</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4 }}
      >
        Back to Home
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.images[0]}
              alt={product.title}
              sx={{ objectFit: "cover" }}
            />
          </Card>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {product.images.slice(1).map((img: string, index: number) => (
              <Grid size={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="100"
                    image={img}
                    alt={`${product.title} ${index + 2}`}
                    sx={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            {product.title}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              ${product.price}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              size="large"
              onClick={() => handleAddToCart(product)}
              sx={{ mr: 2 }}
            >
              Add to Cart
            </Button>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Category: {product.category.name}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{ fontSize: "1.rem", lineHeight: 1.8 }}
          >
            {product.description}
          </Typography>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProductDetailPage;
