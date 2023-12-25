import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Button from "./Button";

describe("<Button/>", () => {
  it("should render the text for the button that is comming from the props", () => {
    const testValue = "test";
    render(<Button>{testValue}</Button>);
    expect(screen.getByRole("button", { name: testValue })).toBeInTheDocument();
  });

  it("should call the handler function when clicking on the button", async () => {
    const testFn = vi.fn();
    render(<Button onClick={testFn}>test</Button>);

    await userEvent.click(screen.getByRole("button"));

    expect(testFn).toHaveBeenCalled();
  });
});
