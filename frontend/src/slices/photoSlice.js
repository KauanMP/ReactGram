import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoServices from "./../services/photoServices";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Funções
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoServices.publishPhoto(photo, token);

    // Check for errors

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserPhoto = createAsyncThunk(
  "photo/userphotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    
    const data = await photoServices.getUserPhoto(id, token);

    return data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
