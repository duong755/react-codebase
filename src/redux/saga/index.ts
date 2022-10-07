import { all } from "redux-saga/effects";

import { watchLanguage } from "./language";

export function* rootSaga() {
  yield all([watchLanguage()]);
}
