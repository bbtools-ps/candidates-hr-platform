import { Candidate } from "../../common/models/Candidate";
import CandidateItem from "./CandidateItem/CandidateItem";
import classes from "./CandidatesList.module.css";

interface CandidatesListProps {
  candidates: Candidate[];
  removeCandidate: (payload: string) => void;
  editCandidate: (payload: Candidate) => void;
}

const CandidatesList: React.FC<CandidatesListProps> = ({
  candidates,
  removeCandidate,
  editCandidate,
}) => {
  return (
    <div className={classes["candidates-list-wrapper"]}>
      <div className={classes["candidates-list"]}>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <CandidateItem
              candidate={candidate}
              key={candidate.id}
              removeCandidate={removeCandidate}
              editCandidate={editCandidate}
            />
          ))
        ) : (
          <div className={classes["no-results"]}>No candidates found</div>
        )}
      </div>
    </div>
  );
};

export default CandidatesList;
