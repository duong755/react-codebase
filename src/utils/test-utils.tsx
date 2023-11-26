import React from "react";
import { queries, render, RenderOptions, RenderResult, Queries } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { defaultQueryClient } from "#/configs/react-query";
import { reduxStore } from "#/redux/store";

export function customRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(ui: React.ReactElement, options?: RenderOptions<Q, Container, BaseElement>): RenderResult<Q, Container, BaseElement> {
  if (!options?.wrapper) {
    return render(ui, {
      ...options,
      wrapper: (props) => {
        return (
          <QueryClientProvider client={defaultQueryClient}>
            <Provider store={reduxStore}>{props.children}</Provider>
          </QueryClientProvider>
        );
      },
    });
  }
  return render(ui, options);
}
