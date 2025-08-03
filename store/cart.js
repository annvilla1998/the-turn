import { createSlice } from "@reduxjs/toolkit";

/**
 * Item: {
 *  type: reservation | giftCard | membership,
 *  price: number,
 *  details: { bay: number, time: string, service_time: number, date: string, note?: string, occasion?: string },
 * }
 */
const initialState = {
  cart: {
    items: [],
    total: 0
  },
  isLoading: false,
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      state.cart.items.push(item);
      state.cart.total += item.price;

      state.isLoading = false;
      state.error = null;
    },
    removeFromCart(state, action) {
      const index = action.payload;
      const item = state.cart.items[index];
      if (item) {
        state.cart.total -= item.price;
        state.cart.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.cart.items = [];
      state.cart.total = 0;
    }
  }
  // extraReducers: (builder) => {
  // }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
