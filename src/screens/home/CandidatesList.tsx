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
  // create a list of candidates
  const listCandidates = candidates.map((candidate) => {
    return (
      <CandidateItem
        candidate={candidate}
        key={candidate.id}
        removeCandidate={removeCandidate}
        editCandidate={editCandidate}
      />
    );
  });
  // check if the list of candidates is empty and notify user
  return (
    <div className={classes["candidates-list-wrapper"]}>
      <div className={classes["candidates-list"]}>
        {listCandidates.length > 0 ? (
          listCandidates
        ) : (
          <div className={classes["no-results"]}>No candidates found</div>
        )}
      </div>
    </div>
  );
};

export default CandidatesList;
