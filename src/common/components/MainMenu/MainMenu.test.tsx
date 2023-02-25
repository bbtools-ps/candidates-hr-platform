import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import MainMenu from "./MainMenu";

describe("<MainMenu/>", () => {
  it(
    "should render Logo, Search input field and Add candidate button and not to display Clear button"
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
  it("should show the clear button in the Search input field if the searchInput value is not empty", () => {
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
});
