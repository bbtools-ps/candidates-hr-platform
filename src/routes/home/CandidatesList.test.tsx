import { render, screen } from "@testing-library/react";
import CandidatesList from "./CandidatesList";

const dummyCandidates = [
  {
    name: "Maggie Frank",
    dateOfBirth: "03/12/1990",
    contactNumber: "+381662312123",
    email: "maggie.frank@gmail.com",
    skills: [
      { id: "1", value: "PHP" },
      { id: "2", value: "MySql" },
    ],
    id: "1",
  },
  {
    name: "Ruby Elliott",
    dateOfBirth: "06/18/1995",
    contactNumber: "+381662312123",
    email: "ruby.elliott@gmail.com",
    skills: [
      { id: "3", value: "Adobe Photoshop" },
      { id: "4", value: "Adobe XD" },
    ],
    id: "2",
  },
];

describe("<CandidatesList/>", () => {
  it("should render the list of candidates so that each candidate is in separate card and have same options to Edit and Remove", () => {
    render(
      <CandidatesList
        candidates={dummyCandidates}
        onEditCandidate={() => {}}
        onRemoveCandidate={() => {}}
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
        onEditCandidate={() => {}}
        onRemoveCandidate={() => {}}
      />
    );

    expect(screen.getByText(/No candidates found/i)).toBeInTheDocument();
  });
});
