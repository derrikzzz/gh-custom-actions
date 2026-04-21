import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MainContent from "../components/MainContent";

// My tests!
// Add yet another comment

describe("MainContent", () => {
  it("should render a button", () => {
    render(<MainContent />);

    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should show the help area after clicking the button", async () => {
    render(<MainContent />);

    const button = screen.getByRole("button", { name: /show help/i });
    await userEvent.click(button);
    expect(screen.getByTestId("help-area")).toBeInTheDocument();
  });
});
