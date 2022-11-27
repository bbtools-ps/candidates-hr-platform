import uuid from "react-uuid";
import { Candidate } from "../../common/models/Candidate";
import CandidateForm from "../CandidateForm/CandidateForm";
import Card from "../UI/Card/Card";

interface NewCandidateProps {
  onCancel: () => void;
  onSubmit: (payload: Candidate) => void;
}

const NewCandidate: React.FC<NewCandidateProps> = ({ onCancel, onSubmit }) => {
  return (
    <Card display="grid" styles={{ minWidth: "400px" }}>
      <h2>New candidate</h2>
      <CandidateForm
        onCancel={onCancel}
        onSubmit={onSubmit}
        newCandidateId={uuid()}
      />
    </Card>
  );
};

export default NewCandidate;
