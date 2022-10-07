import type { Action } from "redux";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import type { Epic } from "redux-observable";
import { from, forkJoin, of } from "rxjs";
import { exhaustMap, map } from "rxjs/operators";

import { i18next } from "../../utils/translation";
import { languageSlice } from "../slice/language";

export const languageChangeEpic: Epic<Action<string>, Action<string>> = (action$) => {
  return action$.pipe(
    ofType<Action<string>, string, PayloadAction<string>>("[epic]language/change"),
    exhaustMap((action) => {
      const languageCode = action.payload;
      return forkJoin([
        from(i18next.changeLanguage(languageCode)), //
        of(languageCode),
      ]);
    }),
    map(([, languageCode]) => languageSlice.actions.changeLanguage(languageCode))
  );
};
