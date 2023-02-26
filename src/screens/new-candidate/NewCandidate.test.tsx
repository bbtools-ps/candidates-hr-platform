import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import NewCandidate from "./NewCandidate";

describe("<EditCandidate/>", () => {
  it("should render the heading 'New candidate'", () => {
    render(<NewCandidate onCancel={() => {}} onSubmit={() => {}} />);
    expect(screen.getByText(/new candidate/i)).toBeInTheDocument();
  });
  it("should render the form that allows to enter the candidate data", () => {
    render(<NewCandidate onCancel={() => {}} onSubmit={() => {}} />);
    const submitBtn = screen.getByRole("button", { name: /add/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });
  it("should call the handler function only for the 'Cancel' when cliking on the button", async () => {
    const testSubmit = vi.fn();
    const testCancel = vi.fn();
    render(<NewCandidate onCancel={testCancel} onSubmit={testSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(testSubmit).not.toHaveBeenCalled();
    expect(testCancel).toHaveBeenCalled();
  });
  it("should call the handler function only for the 'Add' when cliking on the button", async () => {
    const testSubmit = vi.fn();
    const testCancel = vi.fn();
    render(<NewCandidate onCancel={testCancel} onSubmit={testSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), "Name");
    await userEvent.type(screen.getByLabelText(/date/i), "2000-03-03");
    await userEvent.type(screen.getByLabelText(/contact/i), "+381123123");
    await userEvent.type(screen.getByLabelText(/e-mail/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/skills/i), "skills{enter}");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(testSubmit).toHaveBeenCalled();
    expect(testCancel).not.toHaveBeenCalled();
  });
});
