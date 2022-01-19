import Card from "../UI/Card";
import CandidateForm from "./CandidateForm";
import styles from "./NewCandidate.module.css";

const EditCandidate = ({
  onCancel,
  onSubmit,
  candidateName,
  candidateDateOfBirth,
  candidateContactNumber,
  candidateEmail,
  candidateSkills,
  candidateId,
}) => {
  const submitHandler = (e) => {
    e.id = candidateId;
    onSubmit(e);
  };
  const convertedDate = candidateDateOfBirth
    .match(/\d+/g)
    .reverse()
    .map((item) => {
      return parseInt(item) < 10 ? (item = "0" + item) : item;
    })
    .join("-");
  return (
    <Card display="grid" className={styles["new-candidate"]}>
      <h2>Edit Candidate</h2>
      <CandidateForm
        onCancel={onCancel}
        onSubmit={submitHandler}
        submitButtonText="Save"
        candidateName={candidateName}
        candidateDateOfBirth={convertedDate}
        candidateContactNumber={candidateContactNumber}
        candidateEmail={candidateEmail}
        candidateSkills={candidateSkills}
      />
    </Card>
  );
};

export default EditCandidate;
