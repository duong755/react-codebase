import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { Action, AnyAction, Store } from "redux";
import createSagaMiddleware from "redux-saga";

import { allReducers } from "./slice";
import { allSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const reduxStore = configureStore({
  reducer: allReducers,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ thunk: true }).concat(sagaMiddleware);
  },
  preloadedState: {
    language: {
      value: "en",
      loading: false,
    },
  },
});

sagaMiddleware.run(allSaga);

export { reduxStore };
export type MyAppState = ReturnType<typeof reduxStore.getState>;
export type MyAppDispatch = typeof reduxStore.dispatch;
export const useReduxStore: <TAction extends Action<any> = AnyAction>() => Store<MyAppState, TAction> = useStore;
export const useAppDispatch: () => MyAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<MyAppState> = useSelector;
