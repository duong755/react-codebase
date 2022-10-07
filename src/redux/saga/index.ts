import { all } from "redux-saga/effects";

import { watchLanguage } from "./language";

export function* allSaga() {
  yield all([watchLanguage()]);
}
