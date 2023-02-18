/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "@testing-library/jest-dom";
import { describe, it } from "@jest/globals";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import { HomeScreen } from "./home";

import { reduxStore } from "#/redux/store";

function renderWithReduxProvider() {
  render(
    <Provider store={reduxStore}>
      <HomeScreen />
    </Provider>
  );
}

beforeEach(() => {
  cleanup();
});

describe("change language", () => {
  it("should be in English", async () => {
    renderWithReduxProvider();

    const helloTextElement = await waitFor(() => screen.findByText("Hello", { selector: "strong" }));
    expect(helloTextElement).toBeInTheDocument();
  });

  describe("change with thunk", () => {
    it("should be changed to German", async () => {
      renderWithReduxProvider();

      const thunkTextElement = await screen.findByText("thunk");
      const thunkSelectElement = thunkTextElement.nextElementSibling;
      expect(thunkSelectElement).toBeInTheDocument();

      fireEvent.change(thunkSelectElement!, { target: { value: "de" } });

      const helloTextElement = await waitFor(() => screen.findByText("Hallo", { selector: "strong" }));
      expect(helloTextElement).toBeInTheDocument();
    });

    it("should be changed to Vietnamese", async () => {
      renderWithReduxProvider();

      const thunkTextElement = await screen.findByText("thunk");
      const thunkSelectElement = thunkTextElement.nextElementSibling;
      expect(thunkSelectElement).toBeInTheDocument();

      fireEvent.change(thunkSelectElement!, { target: { value: "vi" } });

      const helloTextElement = await waitFor(() => screen.findByText("Xin chào", { selector: "strong" }));
      expect(helloTextElement).toBeInTheDocument();
    });
  });

  describe("change with saga", () => {
    it("should be changed to German", async () => {
      renderWithReduxProvider();

      const sagaTextElement = await screen.findByText("saga");
      const sagaSelectElement = sagaTextElement.nextElementSibling;
      expect(sagaSelectElement).toBeInTheDocument();

      fireEvent.change(sagaSelectElement!, { target: { value: "de" } });

      const helloTextElement = await waitFor(() => screen.findByText("Hallo", { selector: "strong" }));
      expect(helloTextElement).toBeInTheDocument();
    });

    it("should be changed to Vietnamese", async () => {
      renderWithReduxProvider();

      const sagaTextElement = await screen.findByText("saga");
      const sagaSelectElement = sagaTextElement.nextElementSibling;
      expect(sagaSelectElement).toBeInTheDocument();

      fireEvent.change(sagaSelectElement!, { target: { value: "vi" } });

      const helloTextElement = await waitFor(() => screen.findByText("Xin chào", { selector: "strong" }));
      expect(helloTextElement).toBeInTheDocument();
    });
  });

  describe("change with observable", () => {
    it("should be changed to German", async () => {
      renderWithReduxProvider();

      const observableTextElement = await screen.findByText("observable");
      const observableSelectElement = observableTextElement.nextElementSibling;
      expect(observableSelectElement).toBeInTheDocument();

      fireEvent.change(observableSelectElement!, { target: { value: "de" } });

      const helloTextElement = await waitFor(() => screen.findByText("Hallo", { selector: "strong" }));
      expect(helloTextElement).toBeInTheDocument();
    });

    it("should be changed to Vietnamese", async () => {
      renderWithReduxProvider();

      const observableTextElement = await screen.findByText("observable");
      const observableSelectElement = observableTextElement.nextElementSibling;
      expect(observableSelectElement).toBeInTheDocument();

      fireEvent.change(observableSelectElement!, { target: { value: "vi" } });

      const helloTextElement = await waitFor(() => screen.findByText("Xin chào", { selector: "strong" }));
      expect(helloTextElement).toBeInTheDocument();
    });
  });
});
