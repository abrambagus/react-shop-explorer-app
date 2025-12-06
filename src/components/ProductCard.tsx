import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea
        component={Link}
        to={`/product/${product.id}`}
        sx={{ height: "100%" }}
      >
        <CardMedia
          component="img"
          height="300"
          image={product.images[0]}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            ${product.price}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
