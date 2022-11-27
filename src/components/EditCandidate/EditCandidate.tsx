import { Candidate } from "../../common/models/Candidate";
import classes from "../../common/styles/CandidateWrapper.module.css";
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
    <div className={classes["candidate-wrapper"]}>
      <Card display="grid">
        <h2>Edit candidate</h2>
        <CandidateForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          submitButtonText="Save"
          candidate={candidate}
        />
      </Card>
    </div>
  );
};

export default EditCandidate;
