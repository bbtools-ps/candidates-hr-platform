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
  notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

describe("<CandidateItem/>", () => {
  it("should render the text fields for Date of birth, Contact number, E-mail, Skills, Notes, and the Edit and Remove buttons", () => {
    render(
      <CandidateItem
        candidate={dummyCandidate}
        onEditCandidate={() => {}}
        onRemoveCandidate={() => {}}
      />
    );

    expect(screen.getByTestId("date-of-birth")).toBeInTheDocument();
    expect(screen.getByTestId("contact-number")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("skills")).toBeInTheDocument();
    expect(screen.getByTestId("notes")).toBeInTheDocument();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("remove-button")).toBeInTheDocument();
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

    await userEvent.click(screen.getByTestId("edit-button"));

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

    await userEvent.click(screen.getByTestId("remove-button"));

    expect(testEdit).not.toHaveBeenCalled();
    expect(testRemove).toHaveBeenCalled();
  });
});
