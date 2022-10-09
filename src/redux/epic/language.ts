import type { Action } from "redux";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import type { Epic } from "redux-observable";
import { forkJoin, of } from "rxjs";
import { exhaustMap, map } from "rxjs/operators";

import { i18next } from "#/utils/translation";
import { languageSlice } from "#/redux/slice/language";
import type { EpicDependencies } from "#/redux/epic";
import type { MyAppState } from "#/redux/slice";

export const languageChangeEpic: Epic<Action<string>, Action<string>, MyAppState, EpicDependencies> = (
  action$,
  state$,
  { language }
) => {
  return action$.pipe(
    ofType<Action<string>, string, PayloadAction<string>>(language.change.type),
    exhaustMap((action) => {
      const languageCode = action.payload;
      return forkJoin([
        i18next.changeLanguage(languageCode), //
        of(languageCode),
      ]);
    }),
    map(([, languageCode]) => languageSlice.actions.change(languageCode))
  );
};
