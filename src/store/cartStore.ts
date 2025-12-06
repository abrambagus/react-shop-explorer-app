import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  setAddToCart: (product: {
    id: number;
    title: string;
    price: number;
    images: string[];
  }) => void;
  setRemoveFromCart: (productId: number) => void;
  setUpdateQuantity: (productId: number, quantity: number) => void;
  setClearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      setAddToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [
              ...currentCart,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images[0],
                quantity: 1,
              },
            ],
          });
        }
      },
      setRemoveFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
      },
      setUpdateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().setRemoveFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      setClearCart: () => set({ cart: [] }),
      getTotalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
