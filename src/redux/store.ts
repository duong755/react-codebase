import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { allReducers } from "./slice";

const reduxStore = configureStore({
  reducer: allReducers,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ thunk: true });
  },
  preloadedState: {
    language: {
      value: "en",
      loading: false,
    },
  },
});

export { reduxStore };
export type MyAppState = ReturnType<typeof reduxStore.getState>;
export type MyAppDispatch = typeof reduxStore.dispatch;
export const useAppDispatch: () => MyAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<MyAppState> = useSelector;
