import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Copyright from "./Copyright";

describe("<Copyright/>", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should render the current year and the author name", () => {
    const mockDate = new Date(2022, 0, 1);
    vi.setSystemTime(mockDate);
    const testAuthor = "test";
    render(<Copyright author={testAuthor} />);

    expect(screen.getByText(testAuthor)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
  });
});
