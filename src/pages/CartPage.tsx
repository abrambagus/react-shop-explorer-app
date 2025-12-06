import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function CartPage() {
  const { cart, setRemoveFromCart, setUpdateQuantity, getTotalPrice } =
    useCartStore();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {cart.map((item) => (
              <Card key={item.id} sx={{ mb: 2, display: "flex", p: 2 }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                  image={item.image}
                  alt={item.title}
                />
                <CardContent
                  sx={{
                    flex: "1 0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    py: 0,
                  }}
                >
                  <Typography component="div" variant="h6">
                    {item.title}
                  </Typography>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Unit Price: ${item.price}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setRemoveFromCart(item.id)}
                      sx={{ ml: "auto" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${getTotalPrice().toFixed(2)}
                </Typography>
              </Box>
            </Card>
            <Button
              component={Link}
              to="/"
              fullWidth
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CartPage;
