import React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import { AppThunk, AppSaga, AppEpic } from "./for-examples";

import { useAppDispatch, useAppSelector } from "#/redux/store";
import { useAppTranslation } from "#/utils/translation";
import { HomeScreen } from "#/screens/home";
import { AboutScreen } from "#/screens/about";

import { useLocalizedNow } from "#/utils/datetime";

const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language);
  const { t } = useAppTranslation();
  const now = useLocalizedNow("LLLL");

  return (
    <div className="text-center">
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
      <div className="p-10"></div>
      <BrowserRouter>
        <div className="py-2">
          <NavLink activeClassName="bg-blue-500 text-white underline" className="px-4 py-2" exact to="/">
            Home
          </NavLink>
          <NavLink activeClassName="bg-blue-500 text-white underline" className="px-4 py-2" to="/about">
            About
          </NavLink>
        </div>
        <Switch>
          <Route path="/about">
            <AboutScreen />
          </Route>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="*">
            <div>Not Found 404</div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export { App };
