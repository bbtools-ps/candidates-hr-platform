import Candidate from "../Candidate/Candidate";
import Card from "../UI/Card";
import styles from "./CandidatesList.module.css";

const CandidatesList = ({ candidates, removeCandidate, editCandidate }) => {
  // create a list of candidates (array)
  const listCandidates = candidates.map((candidate) => {
    return (
      <Candidate
        candidate={candidate}
        key={candidate.id}
        removeCandidate={removeCandidate}
        editCandidate={editCandidate}
      />
    );
  });
  // check if the list of candidates is empty and notify user
  return (
    <div className={styles["candidates-list"]}>
      {listCandidates.length > 0 ? (
        listCandidates
      ) : (
        <Card>No candidates found.</Card>
      )}
    </div>
  );
};

export default CandidatesList;
