import { screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

import { LanguagesScreen } from "./languages";

import { customRender } from "#/utils/test-utils";

describe("change language", () => {
  it("should be in English", async () => {
    customRender(<LanguagesScreen />);

    const helloTextElement = await screen.findByText("Hello", { selector: "strong" });
    expect(helloTextElement).toBeInTheDocument();
  });

  describe("change with thunk", () => {
    it("should be changed to German", async () => {
      customRender(<LanguagesScreen />);

      const threeComboboxes = await screen.findAllByRole("combobox");
      const thunkSelectElement = threeComboboxes[0];
      expect(thunkSelectElement).toBeInTheDocument();

      fireEvent.change(thunkSelectElement, { target: { value: "de" } });

      await waitForElementToBeRemoved(() => screen.queryByText("Loading...", { exact: true }));

      const helloTextElement = await screen.findByText("Hallo", { trim: true, selector: "strong" });
      expect(helloTextElement).toBeInTheDocument();
    });

    it("should be changed to Vietnamese", async () => {
      customRender(<LanguagesScreen />);

      const threeComboboxes = await screen.findAllByRole("combobox");
      const thunkSelectElement = threeComboboxes[0];
      expect(thunkSelectElement).toBeInTheDocument();

      fireEvent.change(thunkSelectElement, { target: { value: "vi" } });

      const helloTextElement = await screen.findByText("Xin chào", { trim: true, selector: "strong" });
      expect(helloTextElement).toBeInTheDocument();
    });
  });

  describe("change with saga", () => {
    it("should be changed to German", async () => {
      customRender(<LanguagesScreen />);

      const threeComboboxes = await screen.findAllByRole("combobox");
      const sagaSelectElement = threeComboboxes[1];
      expect(sagaSelectElement).toBeInTheDocument();

      fireEvent.change(sagaSelectElement, { target: { value: "de" } });

      const helloTextElement = await screen.findByText("Hallo", { trim: true, selector: "strong" });
      expect(helloTextElement).toBeInTheDocument();
    });

    it("should be changed to Vietnamese", async () => {
      customRender(<LanguagesScreen />);

      const threeComboboxes = await screen.findAllByRole("combobox");
      const sagaSelectElement = threeComboboxes[1];
      expect(sagaSelectElement).toBeInTheDocument();

      fireEvent.change(sagaSelectElement, { target: { value: "vi" } });

      const helloTextElement = await screen.findByText("Xin chào", { trim: true, selector: "strong" });
      expect(helloTextElement).toBeInTheDocument();
    });
  });

  describe("change with observable", () => {
    it("should be changed to German", async () => {
      customRender(<LanguagesScreen />);

      const threeComboboxes = await screen.findAllByRole("combobox");
      const observableSelectElement = threeComboboxes[2];
      expect(observableSelectElement).toBeInTheDocument();

      fireEvent.change(observableSelectElement, { target: { value: "de" } });

      const helloTextElement = await screen.findByText("Hallo", { trim: true, selector: "strong" });
      expect(helloTextElement).toBeInTheDocument();
    });

    it("should be changed to Vietnamese", async () => {
      customRender(<LanguagesScreen />);

      const threeComboboxes = await screen.findAllByRole("combobox");
      const observableSelectElement = threeComboboxes[2];
      expect(observableSelectElement).toBeInTheDocument();

      fireEvent.change(observableSelectElement, { target: { value: "vi" } });

      const helloTextElement = await screen.findByText("Xin chào", { trim: true, selector: "strong" });
      expect(helloTextElement).toBeInTheDocument();
    });
  });
});
