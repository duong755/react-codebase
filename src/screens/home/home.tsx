import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { AppThunk, AppSaga, AppEpic } from "#/for-examples";

import { useAppDispatch, useAppSelector } from "#/redux/store";
import { useLocalizedNow } from "#/lib/dayjs";

export const HomeScreen: React.FunctionComponent = () => {
  const { t } = useTranslation("home-screen");
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language);
  const now = useLocalizedNow("LLLL");

  return (
    <Fragment>
      <div className="p-10 text-center">
        <h4 className="font-bold text-3xl py-2">{t("select-redux-middleware")}</h4>
        <div className="flex items-center">
          <div className="w-2/5">
            <div>{t("select-language")}</div>
            <AppThunk language={language} dispatch={dispatch} />
            <AppSaga language={language} dispatch={dispatch} />
            <AppEpic language={language} dispatch={dispatch} />
          </div>
          <div className="w-1/5 text-3xl">&gt;&gt;&gt;</div>
          <div className="w-2/5 bg-slate-200 text-3xl">
            {language.loading && <div>Loading...</div>}
            <div>
              <strong>{t("greeting")}</strong>
            </div>
            <div>{now}</div>
          </div>
        </div>
      </div>
      <div className="p-10"></div>
    </Fragment>
  );
};

export default HomeScreen;
