import { Candidate } from "../../models/Candidate";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./Candidate.module.css";

interface CandidateItemProps {
  candidate: Candidate;
  removeCandidate: (payload: string) => void;
  editCandidate: (payload: Candidate) => void;
}

const CandidateItem: React.FC<CandidateItemProps> = ({
  candidate,
  removeCandidate,
  editCandidate,
}) => {
  return (
    <Card display="grid">
      <h2 className={styles.name}>{candidate.name}</h2>
      <p className={styles["birth-date"]}>
        Date of birth: <span>{candidate.dateOfBirth}</span>
      </p>
      <p className={styles["contact-number"]}>
        Contact number: <span>{candidate.contactNumber}</span>
      </p>
      <p className={styles.email}>
        E-mail: <span>{candidate.email}</span>
      </p>
      <p className={styles.skills}>
        Skills: <span>{candidate.skills}</span>
      </p>
      <div className={styles.controls}>
        <Button
          text="Edit"
          icon="edit"
          onClick={() => {
            editCandidate(candidate);
          }}
        />
        <Button
          text="Remove"
          icon="remove"
          onClick={() => {
            removeCandidate(candidate.id);
          }}
        />
      </div>
    </Card>
  );
};

export default CandidateItem;
