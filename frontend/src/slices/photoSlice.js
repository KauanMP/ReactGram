import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Funções

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
