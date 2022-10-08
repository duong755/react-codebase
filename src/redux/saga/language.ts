import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

import { i18next } from "#/utils/translation";
import { languageSlice } from "#/redux/slice/language";
import { sagaActions } from "#/redux/saga/actions";

function* languageChangeAsync(action: PayloadAction<string>) {
  const languageCode = action.payload;
  yield i18next.changeLanguage(languageCode);
  yield put(languageSlice.actions.changeLanguage(languageCode));
}

export function* watchLanguage() {
  yield takeEvery(sagaActions.language.change, languageChangeAsync);
}
