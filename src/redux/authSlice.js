import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { logInSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
