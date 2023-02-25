import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import CandidateForm from "./CandidateForm";

describe("<CandidateForm/>", () => {
  it("should render all required fields: Name, Date of birth, Contact number, E-mail, Skills and buttons Cancel and Add", () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /contact/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /e-mail/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /skills/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });
  it("should initially disable the Add button", () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);

    expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
  });
  it("should show an error if the user didn't enter anything into the Name field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/name/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.click(testEl);
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should show an error if the user didn't enter anything into the Date of birth field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/date/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.click(testEl);
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should show an error if the user entered invalid data into the Date of birth field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/date/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.type(testEl, "03");
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should show an error if the user didn't enter anything into the Contact number field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/contact/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.click(testEl);
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should show an error if the user didn't enter anything into the Contact number field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/contact/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.click(testEl);
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should show an error if the user entered invalid data into the Contact number field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/contact/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.type(testEl, "a");
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should show an error if the user didn't enter anything into the E-mail field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/e-mail/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.click(testEl);
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should show an error if the user entered invalid data into the E-mail field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/e-mail/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.type(testEl, "a123@");
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should show an error if the user didn't enter anything into the Skills field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/skills/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });

    await userEvent.click(testEl);
    await userEvent.click(btnAdd);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(btnAdd).toBeDisabled();
  });
  it("should still keep the button disabled if the user just entered valid data into the Name field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/name/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });
    const testValue = "Name";

    await userEvent.type(testEl, testValue);
    await userEvent.click(btnAdd);

    expect(() => screen.getByText(/please fill out this field/i)).toThrow();
    expect(btnAdd).toBeDisabled();
  });
  it("should still keep the button disabled if the user just entered valid data into the Contact number field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/contact/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });
    const testValue = "+381123123123";

    await userEvent.type(testEl, testValue);
    await userEvent.click(btnAdd);

    expect(() => screen.getByText(/please fill out this field/i)).toThrow();
    expect(btnAdd).toBeDisabled();
  });
  it("should still keep the button disabled if the user just entered valid data into the E-mail field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/e-mail/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });
    const testValue = "test@test.com";

    await userEvent.type(testEl, testValue);
    await userEvent.click(btnAdd);

    expect(() => screen.getByText(/please fill out this field/i)).toThrow();
    expect(btnAdd).toBeDisabled();
  });
  it("should still keep the button disabled if the user just entered valid data into the Skills field", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);
    const testEl = screen.getByLabelText(/skills/i);
    const btnAdd = screen.getByRole("button", { name: /add/i });
    const testValue = "skill";

    await userEvent.type(testEl, testValue);
    await userEvent.click(btnAdd);

    expect(() => screen.getByText(/please fill out this field/i)).toThrow();
    expect(btnAdd).toBeDisabled();
  });
  it("should enable the Add button if the user entered all valid values", async () => {
    render(<CandidateForm onCancel={() => {}} onSubmit={() => {}} />);

    await userEvent.type(screen.getByLabelText(/name/i), "Name");
    await userEvent.type(screen.getByLabelText(/date/i), "2000-03-03");
    await userEvent.type(screen.getByLabelText(/contact/i), "+381123123");
    await userEvent.type(screen.getByLabelText(/e-mail/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/skills/i), "skills");

    expect(screen.getByRole("button", { name: /add/i })).toBeEnabled();
  });
});