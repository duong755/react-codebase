import { createSlice } from "@reduxjs/toolkit";

import { languageChangeThunk } from "../thunk";

const initialState = {
  value: "en",
  loading: false,
};

export const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(languageChangeThunk.pending, (state) => {
        return {
          value: state.value,
          loading: true,
        };
      })
      .addCase(languageChangeThunk.fulfilled, (state, action) => {
        return {
          value: action.payload,
          loading: false,
        };
      })
      .addCase(languageChangeThunk.rejected, (state) => {
        return {
          value: state.value,
          loading: false,
        };
      });
  },
});
