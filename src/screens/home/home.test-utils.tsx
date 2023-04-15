import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { HomeScreen } from "./home";

import { reduxStore } from "#/redux/store";

export function renderHomeScreen() {
  return render(<HomeScreen />, {
    wrapper: (props) => {
      return <Provider store={reduxStore}>{props.children}</Provider>;
    },
  });
}
