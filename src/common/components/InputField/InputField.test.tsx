import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import InputField from "./InputField";

describe("<InputField/>", () => {
  it("should render the label and the value that are comming from the props", () => {
    const testLabel = "label";
    const testValue = "value";
    render(<InputField label={testLabel} value={testValue} />);

    expect(
      screen.getByRole("textbox", { name: testLabel })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(testLabel)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: testLabel })).toHaveValue(
      testValue
    );
  });
});
