import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { App } from "./app";
import "./index.scss";

import { reduxStore } from "#/redux/store";
import "#/lib/dayjs";
import "#/lib/i18next";
import { defaultQueryClient } from "#/lib/react-query";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={defaultQueryClient}>
      <ReduxProvider store={reduxStore}>
        <App />
      </ReduxProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
