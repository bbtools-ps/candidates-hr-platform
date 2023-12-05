import Button from "@/common/components/Button/Button";
import { Candidate } from "@/common/models";

interface ICandidateItemProps {
  candidate: Candidate;
  onRemoveCandidate: (payload: string) => void;
  onEditCandidate: (payload: Candidate) => void;
}

const CandidateItem: React.FC<ICandidateItemProps> = ({
  candidate,
  onRemoveCandidate,
  onEditCandidate,
}) => {
  return (
    <div
      className="bg-white text-black m-2 flex w-full flex-col rounded p-4 shadow-sm md:w-1/2 lg:w-1/3"
      data-cy={candidate.name}
    >
      <h2 className="mb-4">{candidate.name}</h2>
      <div className="flex flex-1 flex-col gap-2 overflow-auto">
        <p>
          <strong className="mr-2">Date of birth:</strong>
          <span>{candidate.dateOfBirth}</span>
        </p>
        <p>
          <strong className="mr-2">Contact number:</strong>
          <span>{candidate.contactNumber}</span>
        </p>
        <p>
          <strong className="mr-2">E-mail:</strong>
          <span>{candidate.email}</span>
        </p>
        <p className="flex flex-wrap gap-2">
          <strong>Skills:</strong>
          {candidate.skills.map(({ value, id }) => (
            <span
              key={id}
              className="rounded border border-solid border-blue px-2 py-1"
            >
              {value}
            </span>
          ))}
        </p>
      </div>
      <div className="flex gap-4 self-end lg:flex-row">
        <Button
          icon="edit"
          onClick={() => {
            onEditCandidate(candidate);
          }}
          data-cy="edit-candidate-btn"
          variant="outlined"
        >
          Edit
        </Button>
        <Button
          icon="remove"
          onClick={() => {
            onRemoveCandidate(candidate.id);
          }}
          data-cy="remove-candidate-btn"
          variant="red"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CandidateItem;
