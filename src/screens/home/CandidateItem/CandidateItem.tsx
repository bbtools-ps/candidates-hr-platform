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
    <Card className={classes["candidate-wrapper"]} data-cy={candidate.name}>
      <h2 className={classes.name} style={{ marginTop: "0.5rem" }}>
        {candidate.name}
      </h2>
      <div className={classes.description}>
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
          {`Skills: `}
          {candidate.skills.map(({ value, id }) => (
            <span key={id} className={classes.skill}>
              {value}
            </span>
          ))}
        </p>
      </div>
      <div className={classes.controls}>
        <Button
          text="Edit"
          icon="edit"
          onClick={() => {
            editCandidate(candidate);
          }}
          data-cy="edit-candidate-btn"
        />
        <Button
          text="Remove"
          icon="remove"
          onClick={() => {
            removeCandidate(candidate.id);
          }}
          data-cy="remove-candidate-btn"
        />
      </div>
    </Card>
  );
};

export default CandidateItem;
