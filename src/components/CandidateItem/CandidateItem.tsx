import { Candidate } from "../../models/Candidate";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from "./Candidate.module.css";

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
      <h2 className={classes.name}>{candidate.name}</h2>
      <p className={classes["birth-date"]}>
        Date of birth: <span>{candidate.dateOfBirth}</span>
      </p>
      <p className={classes["contact-number"]}>
        Contact number: <span>{candidate.contactNumber}</span>
      </p>
      <p className={classes.email}>
        E-mail: <span>{candidate.email}</span>
      </p>
      <p className={classes.skills}>
        Skills: <span>{candidate.skills}</span>
      </p>
      <div className={classes.controls}>
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
