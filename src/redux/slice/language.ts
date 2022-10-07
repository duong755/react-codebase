import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { languageChangeThunk, languageResetThunk } from "../thunk";

const initialState = {
  value: "en",
  loading: false,
};

export const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      return {
        value: action.payload,
        loading: false,
      };
    },
  },
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

    builder
      .addCase(languageResetThunk.pending, (state) => {
        return {
          value: state.value,
          loading: true,
        };
      })
      .addCase(languageResetThunk.fulfilled, () => {
        return {
          value: "en",
          loading: false,
        };
      })
      .addCase(languageResetThunk.rejected, (state) => {
        return {
          value: state.value,
          loading: false,
        };
      });
  },
});
