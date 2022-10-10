import React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import { AppThunk, AppSaga, AppEpic } from "./for-examples";

import { useAppDispatch, useAppSelector } from "#/redux/store";
import { useCustomTranslation } from "#/utils/translation";
import { HomeScreen } from "#/screens/home";
import { AboutScreen } from "#/screens/about";

const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language);
  const { t } = useCustomTranslation();

  return (
    <div className="text-center">
      <h4 className="font-bold text-3xl py-2">Choose a Redux middleware</h4>
      <div className="flex">
        <div className="w-1/3">
          <AppThunk language={language} dispatch={dispatch} />
        </div>
        <div className="w-1/3">
          <AppSaga language={language} dispatch={dispatch} />
        </div>
        <div className="w-1/3">
          <AppEpic language={language} dispatch={dispatch} />
        </div>
      </div>
      <div>
        {language.loading && <div>Loading...</div>}
        Select language to see change: <strong>{t("introduction")}</strong>
      </div>
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
