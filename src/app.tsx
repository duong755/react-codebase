import React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import { HomeScreen } from "#/screens/home";
import { AboutScreen } from "#/screens/about";

const App: React.FunctionComponent = () => {
  return (
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
  );
};

export { App };
