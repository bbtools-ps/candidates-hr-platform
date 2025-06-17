import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import InputField from "./InputField";

describe("<InputField/>", () => {
  it("should render the the label and the value that are comming from the props", () => {
    const testLabel = "label";
    const testValue = "value";
    render(<InputField label={testLabel} defaultValue={testValue} />);

    expect(
      screen.getByRole("textbox", { name: testLabel })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(testLabel)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: testLabel })).toHaveValue(
      testValue
    );
  });

  it("should call the onChange handler function when typing into the input field", async () => {
    const user = userEvent.setup();
    const testFn = vi.fn();
    render(<InputField onChange={testFn} />);

    await user.type(screen.getByRole("textbox"), "test");

    expect(testFn).toHaveBeenCalled();
  });
});
