import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../slice/cartApi";

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(cartApi.endpoints.getCart.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addMatcher(cartApi.endpoints.getCart.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(
        cartApi.endpoints.addToCart.matchFulfilled,
        (state, action) => {
          state.cart = action.payload.data;
        }
      )
      .addMatcher(
        cartApi.endpoints.removeFromCart.matchFulfilled,
        (state, action) => {
          state.cart = action.payload.data;
        }
      )
      .addMatcher(
        cartApi.endpoints.updateCart.matchFulfilled,
        (state, action) => {
          state.cart = action.payload.data;
        }
      );
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
