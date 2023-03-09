import CandidateForm from "../../common/components/CandidateForm/CandidateForm";
import Card from "../../common/components/Card/Card";
import { Candidate } from "../../common/models/Candidate";
import classes from "../../common/styles/CandidateWrapper.module.css";

interface NewCandidateProps {
  onCancel: () => void;
  onSubmit: (payload: Candidate) => void;
}

const NewCandidate: React.FC<NewCandidateProps> = ({ onCancel, onSubmit }) => {
  return (
    <div className={classes["candidate-wrapper"]}>
      <Card display="grid" style={{ marginTop: "1rem" }}>
        <h2>New candidate</h2>
        <CandidateForm onCancel={onCancel} onSubmit={onSubmit} />
      </Card>
    </div>
  );
};

export default NewCandidate;
