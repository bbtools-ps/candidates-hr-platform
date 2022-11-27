import uuid from "react-uuid";
import { Candidate } from "../../models/Candidate";
import Card from "../UI/Card";
import CandidateForm from "./CandidateForm";
import styles from "./NewCandidate.module.css";

interface NewCandidateProps {
  onCancel: () => void;
  onSubmit: (payload: Candidate) => void;
}

const NewCandidate: React.FC<NewCandidateProps> = ({ onCancel, onSubmit }) => {
  return (
    <Card display="grid" className={styles["new-candidate"]}>
      <h2>New Candidate</h2>
      <CandidateForm
        onCancel={onCancel}
        onSubmit={onSubmit}
        newCandidateId={uuid()}
      />
    </Card>
  );
};

export default NewCandidate;
