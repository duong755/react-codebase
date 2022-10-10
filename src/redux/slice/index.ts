import { languageSlice } from "./language";

import { StateFromReducerMapObject } from "#/types/redux";

export { languageSlice };

export const rootReducer = {
  language: languageSlice.reducer,
};

export type MyAppState = StateFromReducerMapObject<typeof rootReducer>;
