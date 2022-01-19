import uuid from "react-uuid";
import Card from "../UI/Card";
import CandidateForm from "./CandidateForm";
import styles from "./NewCandidate.module.css";

const NewCandidate = ({ onCancel, onSubmit }) => {
  const submitHandler = (e) => {
    e.id = uuid();
    onSubmit(e);
  };
  return (
    <Card display="grid" className={styles["new-candidate"]}>
      <h2>New Candidate</h2>
      <CandidateForm onCancel={onCancel} onSubmit={submitHandler} />
    </Card>
  );
};

export default NewCandidate;
