import React from "react";
import { render } from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { reduxStore } from "./redux/store";
import { App } from "./app";
import "./index.scss";

const root = document.getElementById("root") as HTMLElement;

render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  root
);
