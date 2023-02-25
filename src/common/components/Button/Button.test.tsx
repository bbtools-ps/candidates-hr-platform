import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import Button from "./Button";

describe("<Button/>", () => {
  it("should render the text for the button that is comming from the props", () => {
    const testValue = "test";
    render(<Button text={testValue} />);
    expect(screen.getByRole("button", { name: testValue })).toBeInTheDocument();
  });
  it("should call the handler function when clicking on the button", async () => {
    const testFn = vi.fn();
    render(<Button text="test" onClick={testFn} />);

    await userEvent.click(screen.getByRole("button"));

    expect(testFn).toHaveBeenCalled();
  });
});
