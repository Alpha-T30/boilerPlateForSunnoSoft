import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    name: "Enamul Haque",
    age: "25",
    mobile: "+8801611126730",
    roles: [2001, 1984, 5150],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInSuccess: (state, action) => {},
  },
});

export const { logInSuccess } = authSlice.actions;

export default authSlice.reducer;
