import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import CandidateItem from "./CandidateItem";

const dummyCandidate = {
  name: "Maggie Frank",
  dateOfBirth: "03/12/1990",
  contactNumber: "+381662312123",
  email: "maggie.frank@gmail.com",
  skills: "PHP, MySql",
  id: "1",
};

describe("<CandidateItem/>", () => {
  it("should render the text fields for Date of birth, Contact number, E-mail, Skills, and the Edit and Remove buttons", () => {
    render(
      <CandidateItem
        candidate={dummyCandidate}
        editCandidate={() => {}}
        removeCandidate={() => {}}
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
        editCandidate={() => {}}
        removeCandidate={() => {}}
      />
    );

    expect(screen.getByText(dummyCandidate.name)).toBeInTheDocument();
    expect(screen.getByText(dummyCandidate.contactNumber)).toBeInTheDocument();
    expect(screen.getByText(dummyCandidate.dateOfBirth)).toBeInTheDocument();
    expect(screen.getByText(dummyCandidate.email)).toBeInTheDocument();
    expect(screen.getByText(dummyCandidate.skills)).toBeInTheDocument();
  });
});
