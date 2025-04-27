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

  it("uses provided id", () => {
    render(<Checkbox label="Test Label" id="custom-id" />);

    expect(screen.getByLabelText("Test Label")).toHaveAttribute(
      "id",
      "custom-id"
    );
  });
});
