import { languageSlice } from "./language";
export { languageSlice };

export const rootReducer = {
  language: languageSlice.reducer,
};
