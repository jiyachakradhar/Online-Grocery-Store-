import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      if (
        action.payload.username == "azmin" &&
        action.payload.password == "gamerZone"
      ) {
        state.loggedIn = true;
      }
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export default adminSlice.reducer;

export const { login, logout } = adminSlice.actions;
