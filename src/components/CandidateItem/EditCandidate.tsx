import { Candidate } from "../../models/Candidate";
import Card from "../UI/Card";
import CandidateForm from "./CandidateForm";
import styles from "./NewCandidate.module.css";

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
    <Card display="grid" className={styles["new-candidate"]}>
      <h2>Edit Candidate</h2>
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
