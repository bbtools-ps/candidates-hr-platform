import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import EditCandidate from "./EditCandidate";

const dummyCandidate = {
  name: "Maggie Frank",
  dateOfBirth: "03/12/1990",
  contactNumber: "+381662312123",
  email: "maggie.frank@gmail.com",
  skills: [
    { id: "1", value: "PHP" },
    { id: "2", value: "MySql" },
  ],
  id: "1",
};

describe("<EditCandidate/>", () => {
  it("should render the heading 'Edit candidate'", () => {
    render(
      <EditCandidate
        candidate={dummyCandidate}
        onCancel={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByText(/edit candidate/i)).toBeInTheDocument();
  });
  it("should render the form that allows to enter the candidate data", () => {
    render(
      <EditCandidate
        candidate={dummyCandidate}
        onCancel={() => {}}
        onSubmit={() => {}}
      />
    );
    const submitBtn = screen.getByRole("button", { name: /save/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeEnabled();
  });
  it("should call the handler function only for the 'Cancel' when cliking on the button", async () => {
    const testSubmit = vi.fn();
    const testCancel = vi.fn();
    render(
      <EditCandidate
        candidate={dummyCandidate}
        onCancel={testCancel}
        onSubmit={testSubmit}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(testSubmit).not.toHaveBeenCalled();
    expect(testCancel).toHaveBeenCalled();
  });
  it("should call the handler function only for the 'Save(submit)' when cliking on the button", async () => {
    const testSubmit = vi.fn();
    const testCancel = vi.fn();
    render(
      <EditCandidate
        candidate={dummyCandidate}
        onCancel={testCancel}
        onSubmit={testSubmit}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(testSubmit).toHaveBeenCalled();
    expect(testCancel).not.toHaveBeenCalled();
  });
});
