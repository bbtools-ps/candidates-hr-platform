import { render, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("<Checkbox />", () => {
  it("renders with label", () => {
    render(<Checkbox label="Test Label" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<Checkbox />);

    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("assigns id based on label", () => {
    render(<Checkbox label="Test Label" />);

    expect(screen.getByLabelText("Test Label")).toHaveAttribute(
      "id",
      "test-label"
    );
  });

  it("uses provided id", () => {
    render(<Checkbox label="Test Label" id="custom-id" />);

    expect(screen.getByLabelText("Test Label")).toHaveAttribute(
      "id",
      "custom-id"
    );
  });

  it("passes additional props to input", () => {
    render(<Checkbox label="Test Label" data-test="test-prop" />);

    expect(screen.getByLabelText("Test Label")).toHaveAttribute(
      "data-test",
      "test-prop"
    );
  });
});
