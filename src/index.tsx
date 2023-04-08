import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import { App } from "./app";
import "./index.scss";

import { reduxStore } from "#/redux/store";
import "#/lib/dayjs";
import "#/lib/i18next";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
