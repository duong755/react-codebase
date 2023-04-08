import { render, screen } from "@testing-library/react";

import { AboutScreen } from "./about";

describe("test about page", () => {
  it("should display title", async () => {
    render(<AboutScreen />);
    const titleElement = await screen.findByText('path "/about"');
    expect(titleElement).toBeInTheDocument();
  });
});
