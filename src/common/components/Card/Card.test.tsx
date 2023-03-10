import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Card from "./Card";

describe("<Card/>", () => {
  it("should render the children that are passed as a prop", () => {
    const testValue = "test value";
    render(
      <Card>
        <p>{testValue}</p>
      </Card>
    );
    expect(screen.getByText(/test value/i)).toBeInTheDocument();
  });
});
