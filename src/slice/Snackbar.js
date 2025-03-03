import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: ""
};
const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    hideSnackbar: (state, action) => {
      state.isOpen = false;
    }
  }
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
