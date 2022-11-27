import { Candidate } from "../../models/Candidate";
import CandidateForm from "../CandidateForm/CandidateForm";
import Card from "../UI/Card/Card";

interface EditCandidateProps {
  candidate: Candidate;
  onCancel: () => void;
  onSubmit: (payload: Candidate) => void;
}

const EditCandidate: React.FC<EditCandidateProps> = ({
  candidate,
  onCancel,
  onSubmit,
}) => {
  return (
    <Card display="grid" styles={{ minWidth: "400px" }}>
      <h2>Edit candidate</h2>
      <CandidateForm
        onCancel={onCancel}
        onSubmit={onSubmit}
        submitButtonText="Save"
        candidate={candidate}
      />
    </Card>
  );
};

export default EditCandidate;
