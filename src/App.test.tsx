import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HashRouter } from "react-router-dom";
import { describe } from "vitest";
import App from "./App";
import "./test/matchMedia.mock";

describe("<App/>", () => {
  beforeEach(() => {
    window.history.pushState({}, "home page", "/");
  });
  it("should render the main menu, candidates list and footer components", () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    expect(screen.getByText(/candidates/i)).toBeInTheDocument();
    expect(screen.getByText(/hr assistance platform/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search candidate/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add candidate/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/date of birth/i)).toBeDefined();
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });
  it("should filter the candidates list when typing into the Search input field", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    await userEvent.type(
      screen.getByPlaceholderText(/search candidate/i),
      "maggie"
    );

    expect(screen.getAllByText(/date of birth/i)).toHaveLength(1);
    expect(() => screen.getByText(/no candidates found/i)).toThrow();
  });
  it("should show the message 'No candidates found.' when trying to search for non existing candidate", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    await userEvent.type(
      screen.getByPlaceholderText(/search candidate/i),
      "aaaaaaaa"
    );

    expect(screen.getByText(/no candidates found/i)).toBeInTheDocument();
  });
  it("should reset the candidates search query when clicking on the Clear/Reset button", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const searchField = screen.getByPlaceholderText(/search candidate/i);

    await userEvent.type(searchField, "aaaaaaaa");
    await userEvent.click(screen.getByRole("button", { name: /clear/i }));

    expect(searchField).toHaveValue("");
    expect(() => screen.getByText(/no candidates found/i)).toThrow();
  });
  it("should remove the candidate from the list when clicking on the 'Remove' button", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const totalCandidates = screen.getAllByText(/date of birth/i).length;

    await userEvent.click(
      screen.getAllByRole("button", { name: /remove/i })[0]
    );

    expect(screen.getAllByText(/date of birth/i).length).toBe(
      totalCandidates - 1
    );
  });
  it("should go to the 'New candidate' page when clicking on the 'Add candidate' button", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    await userEvent.click(
      screen.getByRole("button", { name: /add candidate/i })
    );

    expect(screen.getByText(/new candidate/i)).toBeInTheDocument();
  });
  it("should go back to the 'Home' page when clicking on 'Cancel' button on the 'New candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    await userEvent.click(
      screen.getByRole("button", { name: /add candidate/i })
    );
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(
      screen.getByPlaceholderText(/search candidate/i)
    ).toBeInTheDocument();
  });
  it("should add new candidate to the candidates list when clicking 'Add' button on the 'New candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const totalCandidates = screen.getAllByText(/date of birth/i).length;

    await userEvent.click(
      screen.getByRole("button", { name: /add candidate/i })
    );
    await userEvent.type(screen.getByLabelText(/name/i), "Name");
    await userEvent.type(screen.getByLabelText(/date/i), "2000-03-03");
    await userEvent.type(screen.getByLabelText(/contact/i), "+381123123");
    await userEvent.type(screen.getByLabelText(/e-mail/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/skills/i), "skills");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getAllByText(/date of birth/i)).toHaveLength(
      totalCandidates + 1
    );
  });
  it("should keep the search query on the 'Home' page when clicking on the 'Cancel' button on the 'New candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "maggie";

    await userEvent.type(
      screen.getByPlaceholderText(/search candidate/i),
      testValue
    );
    await userEvent.click(
      screen.getByRole("button", { name: /add candidate/i })
    );
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.getByPlaceholderText(/search candidate/i)).toHaveValue(
      testValue
    );
  });
  it("should reset the search query on the 'Home' page when clicking on the 'Add' button on the 'New candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "maggie";

    await userEvent.type(
      screen.getByPlaceholderText(/search candidate/i),
      testValue
    );
    await userEvent.click(
      screen.getByRole("button", { name: /add candidate/i })
    );
    await userEvent.type(screen.getByLabelText(/name/i), "Name");
    await userEvent.type(screen.getByLabelText(/date/i), "2000-03-03");
    await userEvent.type(screen.getByLabelText(/contact/i), "+381123123");
    await userEvent.type(screen.getByLabelText(/e-mail/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/skills/i), "skills");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByPlaceholderText(/search candidate/i)).toHaveValue("");
  });
  it("should go to the 'Edit candidate' page when clicking on the 'Edit' button", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    expect(screen.getByText(/edit candidate/i)).toBeInTheDocument();
  });
  it("should go back to the 'Home' page when clicking on 'Cancel' button on the 'Edit candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(
      screen.getByPlaceholderText(/search candidate/i)
    ).toBeInTheDocument();
  });
  it("should update the candidate 'Name' when chaning it on the 'Edit candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "test name";

    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await userEvent.clear(screen.getByLabelText(/name/i));
    await userEvent.type(screen.getByLabelText(/name/i), testValue);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getAllByRole("heading", { level: 2 })[0]).toHaveTextContent(
      testValue
    );
  });
  it("should update the candidate 'Date of birth' when chaning it on the 'Edit candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "2000-03-03";

    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await userEvent.clear(screen.getByLabelText(/date/i));
    await userEvent.type(screen.getByLabelText(/date/i), testValue);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText("03/03/2000")).toBeInTheDocument();
  });
  it("should update the candidate 'Contact number' when chaning it on the 'Edit candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "+381123123";

    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await userEvent.clear(screen.getByLabelText(/contact number/i));
    await userEvent.type(screen.getByLabelText(/contact number/i), testValue);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText(testValue)).toBeInTheDocument();
  });
  it("should update the candidate 'E-mail' when chaning it on the 'Edit candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "test@test.com";

    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await userEvent.clear(screen.getByLabelText(/e-mail/i));
    await userEvent.type(screen.getByLabelText(/e-mail/i), testValue);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText(testValue)).toBeInTheDocument();
  });
  it("should update the candidate 'Skills' when chaning it on the 'Edit candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "test skill";

    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await userEvent.clear(screen.getByLabelText(/skills/i));
    await userEvent.type(screen.getByLabelText(/skills/i), testValue);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText(testValue)).toBeInTheDocument();
  });
  it("should keep the search query on the 'Home' page when clicking on the 'Cancel' button on the 'Edit candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "maggie";

    await userEvent.type(
      screen.getByPlaceholderText(/search candidate/i),
      testValue
    );
    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.getByPlaceholderText(/search candidate/i)).toHaveValue(
      testValue
    );
  });
  it("should keep the search query on the 'Home' page when clicking on the 'Save' button on the 'Edit candidate' page", async () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const testValue = "maggie";

    await userEvent.type(
      screen.getByPlaceholderText(/search candidate/i),
      testValue
    );
    await userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByPlaceholderText(/search candidate/i)).toHaveValue(
      testValue
    );
  });
});
