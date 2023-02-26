import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import ClearButton from "./ClearButton";

describe("<ClearButton/>", () => {
  it("should render the 'Clear' button", () => {
    render(<ClearButton />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });
  it("should call the handler function when clicking on the 'Clear' button", async () => {
    const testFn = vi.fn();
    render(<ClearButton onClick={testFn} />);

    await userEvent.click(screen.getByRole("button", { name: /clear/i }));

    expect(testFn).toHaveBeenCalled();
  });
});
