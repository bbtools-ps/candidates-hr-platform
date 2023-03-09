import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, vi } from "vitest";
import "../../../test/matchMedia.mock";
import MainMenu from "./MainMenu";

describe("<MainMenu/>", () => {
  it(
    "should render Logo, Search input field and Add candidate button and not to display Clear/Reset button"
  );
  render(
    <MainMenu
      onResetCandidates={() => {}}
      onAddNewCandidate={() => {}}
      onChange={() => {}}
      searchInput=""
    />
  );

  expect(screen.getByText(/candidates/i)).toBeInTheDocument();
  expect(screen.getByText(/hr assistance platform/i)).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/search candidate name/i)
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /add candidate/i })
  ).toBeInTheDocument();
  expect(() => screen.getByRole("button", { name: /clear/i })).toThrow();
  it("should display value in the Search input field that is comming from the props", () => {
    const testValue = "test";
    render(
      <MainMenu
        onResetCandidates={() => {}}
        onAddNewCandidate={() => {}}
        onChange={() => {}}
        searchInput={testValue}
      />
    );

    expect(screen.getByPlaceholderText(/search candidate name/i)).toHaveValue(
      testValue
    );
  });
  it("should show the Clear/Reset button in the Search input field if the searchInput value is not empty", () => {
    const testValue = "test";
    render(
      <MainMenu
        onResetCandidates={() => {}}
        onAddNewCandidate={() => {}}
        onChange={() => {}}
        searchInput={testValue}
      />
    );

    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });
  it("should call the handler function only for the 'Add' when clicking on the button", async () => {
    const testHandleReset = vi.fn();
    const testHandleAdd = vi.fn();
    const testHandleChange = vi.fn();
    render(
      <MainMenu
        onResetCandidates={testHandleReset}
        onAddNewCandidate={testHandleAdd}
        onChange={testHandleChange}
        searchInput=""
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(testHandleAdd).toHaveBeenCalled();
    expect(testHandleReset).not.toHaveBeenCalled();
    expect(testHandleChange).not.toHaveBeenCalled();
  });
  it("should call the handler function only for the 'Clear/Reset' when clicking on the button", async () => {
    const testHandleReset = vi.fn();
    const testHandleAdd = vi.fn();
    const testHandleChange = vi.fn();
    render(
      <MainMenu
        onResetCandidates={testHandleReset}
        onAddNewCandidate={testHandleAdd}
        onChange={testHandleChange}
        searchInput="test"
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /clear/i }));

    expect(testHandleAdd).not.toHaveBeenCalled();
    expect(testHandleReset).toHaveBeenCalled();
    expect(testHandleChange).not.toHaveBeenCalled();
  });
  it("should call the handler function only for the 'Search' when typing inside the input field", async () => {
    const testHandleReset = vi.fn();
    const testHandleAdd = vi.fn();
    const testHandleChange = vi.fn();
    render(
      <MainMenu
        onResetCandidates={testHandleReset}
        onAddNewCandidate={testHandleAdd}
        onChange={testHandleChange}
        searchInput=""
      />
    );

    await userEvent.type(
      screen.getByPlaceholderText(/search candidate/i),
      "test"
    );

    expect(testHandleAdd).not.toHaveBeenCalled();
    expect(testHandleReset).not.toHaveBeenCalled();
    expect(testHandleChange).toHaveBeenCalled();
  });
});
