import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "ui",
  initialState: {
    isBurgerOpen: false,
  },
  reducers: {
    toggleIsOpenBurger(state) {
      state.isBurgerOpen = !state.isBurgerOpen;
    },
    setIsOpenBurger(state, action) {
      state.isBurgerOpen = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { toggleIsOpenBurger, setIsOpenBurger } = authSlice.actions;
