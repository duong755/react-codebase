import { createAsyncThunk } from "@reduxjs/toolkit";

import { i18next } from "../../utils/translation";

export const languageChangeThunk = createAsyncThunk<string, string>("language/change", async (language) => {
  await i18next.changeLanguage(language);
  return language;
});

export const languageResetThunk = createAsyncThunk<void, void>("language/reset", async () => {
  await i18next.changeLanguage("en");
});
