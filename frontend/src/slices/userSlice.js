import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";
import { build } from "vite";

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get user details
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userServices.profile(user, token);

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.user = action.payload;
      })
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
