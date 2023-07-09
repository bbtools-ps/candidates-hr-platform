import Button from "@/common/components/Button/Button";
import Card from "@/common/components/Card/Card";
import { Candidate } from "@/common/models";
import classes from "./CandidateItem.module.css";

interface ICandidateItemProps {
  candidate: Candidate;
  removeCandidate: (payload: string) => void;
  editCandidate: (payload: Candidate) => void;
}

const CandidateItem: React.FC<ICandidateItemProps> = ({
  candidate,
  removeCandidate,
  editCandidate,
}) => {
  return (
    <Card display="grid" className={classes["candidate-wrapper"]}>
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
