import { createSlice } from "@reduxjs/toolkit";

/**
 * Item: {
 *  item: "reservation" | "giftCard" | "membership",
 *  price: number,
 *  details: {
 *    // For reservations
 *    bay?: number, time?: string, service_time?: number, date?: string, note?: string, occasion?: string,
 *    // For memberships
 *    name?: string, hours?: number, sessionLength?: number, priceId?: string, recurring?: boolean
 *  },
 * }
 */
const initialState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      state.items.push(item);

      if (item.item === "reservation") {
        state.total += 10; // $10 deposit for reservations
      } else if (item.item === "membership") {
        // For memberships, add the full monthly price to show in cart
        // But we'll handle recurring payments differently in checkout
        state.total += item.price;
      } else {
        state.total += item.price; // Add full price for other items
      }

      state.isLoading = false;
      state.error = null;
    },
    removeFromCart(state, action) {
      const index = action.payload;
      const item = state.items[index];
      if (item) {
        if (item.item === "reservation") {
          state.total -= 10; // $10 deposit for reservations
        } else if (item.item === "membership") {
          state.total -= item.price; // Subtract full price for memberships
        } else {
          state.total -= item.price; // Subtract full price for other items
        }
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    }
  }
  // extraReducers: (builder) => {
  // }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
