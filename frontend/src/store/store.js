import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./feature/user";
import { adminSlice } from "./feature/admin";
import { userApi } from "./slice/userSlice";
import { cartApi } from "./slice/cartApi";
import { productApi } from "./slice/productSlice";
import { orderApi } from "./slice/orderApi";
import cartReducer from "./feature/cartSlicec";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    cart: cartReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
    ]),
});
