import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Logo from "./Logo";

describe("<Logo/>", () => {
  it("should render the text: Candidates, hr assistance platform", () => {
    render(<Logo />);
    expect(screen.getByText(/candidates/i)).toBeInTheDocument();
    expect(screen.getByText(/hr assistance platform/i)).toBeInTheDocument();
  });
});
