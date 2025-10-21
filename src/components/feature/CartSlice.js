import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "regenerator-runtime";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");

    const data = await response.json();

    return data;
  }
);

const initialState = {
  products: [],
  cart: [],
  wishlist: [],
  error: null,
  loading: false,
  discount: 0,
  coupon: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
        alert("item added to Cart");
      }
    },
    AddToWishList: (state, action) => {
      const product = action.payload;
      const existing = state.wishlist.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.wishlist.push({ ...product, quantity: 1 });
        alert("item added to the wishlist");
      }
    },

    RemoveFromWishList: (state, action) => {
      const product = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
    },

    RemoveFromCart: (state, action) => {
      const product = action.payload;
      state.cart = state.cart.filter((item) => item.id != product.id);
    },

    ChangeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    ApplyCoupon: (state, action) => {
      const code = action.payload.toLowerCase();
      let discountPercent = 0;

      if (code === "save10") discountPercent = 10;
      else if (code === "save20") discountPercent = 20;

      // Calculate total safely
      const total = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const discountAmount = Number(
        ((total * discountPercent) / 100).toFixed(2)
      );

      state.discount = discountAmount;
      state.coupon = code;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default CartSlice.reducer;

export const {
  AddToCart,
  RemoveFromCart,
  ChangeQuantity,
  AddToWishList,
  RemoveFromWishList,
  ApplyCoupon,
} = CartSlice.actions;
