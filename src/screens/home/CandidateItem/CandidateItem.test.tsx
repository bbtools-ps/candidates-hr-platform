import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import CandidateItem from "./CandidateItem";

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

describe("<CandidateItem/>", () => {
  it("should render the text fields for Date of birth, Contact number, E-mail, Skills, and the Edit and Remove buttons", () => {
    render(
      <CandidateItem
        candidate={dummyCandidate}
        onEditCandidate={() => {}}
        onRemoveCandidate={() => {}}
      />
    );

    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByText(/contact number/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("should render the values from the props into the appropriate text fields for Name, Date of birth, Contact number, E-mail, and Skills", () => {
    render(
      <CandidateItem
        candidate={dummyCandidate}
        onEditCandidate={() => {}}
        onRemoveCandidate={() => {}}
      />
    );

    expect(screen.getByText(dummyCandidate.name)).toBeInTheDocument();
    expect(screen.getByText(dummyCandidate.contactNumber)).toBeInTheDocument();
    expect(screen.getByText(dummyCandidate.dateOfBirth)).toBeInTheDocument();
    expect(screen.getByText(dummyCandidate.email)).toBeInTheDocument();
    for (const skill of dummyCandidate.skills) {
      expect(screen.getByText(skill.value)).toBeInTheDocument();
    }
  });

  it("should call the handler function only for the 'Edit' when clicking on the button", async () => {
    const testEdit = vi.fn();
    const testRemove = vi.fn();
    render(
      <CandidateItem
        candidate={dummyCandidate}
        onEditCandidate={testEdit}
        onRemoveCandidate={testRemove}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /edit/i }));

    expect(testEdit).toHaveBeenCalled();
    expect(testRemove).not.toHaveBeenCalled();
  });

  it("should call the handler function only for the 'Remove' when clicking on the button", async () => {
    const testEdit = vi.fn();
    const testRemove = vi.fn();
    render(
      <CandidateItem
        candidate={dummyCandidate}
        onEditCandidate={testEdit}
        onRemoveCandidate={testRemove}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /remove/i }));

    expect(testEdit).not.toHaveBeenCalled();
    expect(testRemove).toHaveBeenCalled();
  });
});
