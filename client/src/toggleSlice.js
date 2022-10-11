import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleMenu: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setToggleMenu: (state, action) => {
      state.toggleMenu = action.payload;
    },
  },
});

export const { setToggleMenu } = toggleSlice.actions;

export default toggleSlice.reducer;
