import { createSlice } from "@reduxjs/toolkit";

const buildCartItemId = (productId, pickupDate) =>
  `${productId}__${pickupDate || "no-date"}`;

const initialState = {
  items: [], // { cartItemId, productId, name, price, image, quantity, pickupDate }
  isOpen: false,
  pickupDate: null, // shared globally between the Home hero picker and the modal
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, pickupDate } = action.payload;
      const effectivePickupDate = pickupDate ?? state.pickupDate;
      const cartItemId = buildCartItemId(product.id, effectivePickupDate);

      const existing = state.items.find(
        (item) => item.cartItemId === cartItemId
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          pickupDate: effectivePickupDate,
        });
      }

      state.isOpen = true;
    },

    incrementItem: (state, action) => {
      const item = state.items.find((i) => i.cartItemId === action.payload);
      if (item) item.quantity += 1;
    },

    decrementItem: (state, action) => {
      const item = state.items.find((i) => i.cartItemId === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (i) => i.cartItemId !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
  },
});

export const {
  addToCart,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
  setPickupDate,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;