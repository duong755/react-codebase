import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLeading } from "redux-saga/effects";
import i18next from "i18next";

import { languageSlice } from "#/redux/slice/language";
import { sagaActions } from "#/redux/saga/actions";

function* languageChangeAsync(action: PayloadAction<string>) {
  const languageCode = action.payload;
  yield call(i18next.changeLanguage, languageCode); // RECOMMENDED: use `call` instead of invoking the function directly
  yield put(languageSlice.actions.change(languageCode));
}

export function* watchLanguage() {
  yield takeLeading(sagaActions.language.change, languageChangeAsync);
}
