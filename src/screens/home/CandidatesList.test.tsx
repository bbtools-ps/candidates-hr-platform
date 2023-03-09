import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import "../../test/matchMedia.mock";
import CandidatesList from "./CandidatesList";

const dummyCandidates = [
  {
    name: "Maggie Frank",
    dateOfBirth: "03/12/1990",
    contactNumber: "+381662312123",
    email: "maggie.frank@gmail.com",
    skills: "PHP, MySql",
    id: "1",
  },
  {
    name: "Ruby Elliott",
    dateOfBirth: "06/18/1995",
    contactNumber: "+381662312123",
    email: "ruby.elliott@gmail.com",
    skills: "Adobe Photoshop, Adobe XD",
    id: "2",
  },
];

describe("<CandidatesList/>", () => {
  it("should render the list of candidates so that each candidate is in separate card and have same options to Edit and Remove", () => {
    render(
      <CandidatesList
        candidates={dummyCandidates}
        editCandidate={() => {}}
        removeCandidate={() => {}}
      />
    );

    expect(screen.getAllByRole("button", { name: /edit/i })).toHaveLength(
      dummyCandidates.length
    );
    expect(screen.getAllByRole("button", { name: /remove/i })).toHaveLength(
      dummyCandidates.length
    );
  });
  it("should show a message 'No candidates found'. if there are no candidates to be rendered", () => {
    render(
      <CandidatesList
        candidates={[]}
        editCandidate={() => {}}
        removeCandidate={() => {}}
      />
    );

    expect(screen.getByText(/No candidates found/i)).toBeInTheDocument();
  });
});
