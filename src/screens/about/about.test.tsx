import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import { AboutScreen } from "./about";

describe("test about page", () => {
  it("should display title", async () => {
    render(<AboutScreen />);
    const titleElement = await waitFor(() => screen.findByText('path "/about"'));
    expect(titleElement).toBeInTheDocument();
  });
});
