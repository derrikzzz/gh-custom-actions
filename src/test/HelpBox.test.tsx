import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import HelpBox from "../components/HelpBox";

describe("HelpBox", () => {
  it("should render the title", () => {
    render(<HelpBox title="Test title" text="Test text" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Test title" }),
    ).toBeInTheDocument();
  });

  it("should render the text", () => {
    render(<HelpBox title="Test title" text="Test text" />);

    expect(screen.getByText("Test text")).toBeInTheDocument();
  });
});
