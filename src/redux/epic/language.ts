import type { Action } from "redux";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import type { Epic } from "redux-observable";
import { from, forkJoin, of } from "rxjs";
import { exhaustMap, map } from "rxjs/operators";

import { i18next } from "#/utils/translation";
import { languageSlice } from "#/redux/slice/language";
import { epicActions } from "#/redux/epic/actions";
import { MyAppState } from "#/redux/store";

export const languageChangeEpic: Epic<Action<string>, Action<string>, MyAppState> = (action$, state$) => {
  return action$.pipe(
    ofType<Action<string>, string, PayloadAction<string>>(epicActions.language.change.type),
    exhaustMap((action) => {
      const languageCode = action.payload;
      return forkJoin([
        state$.pipe(),
        from(i18next.changeLanguage(languageCode)), //
        of(languageCode),
      ]);
    }),
    map(([, , languageCode]) => languageSlice.actions.change(languageCode))
  );
};
