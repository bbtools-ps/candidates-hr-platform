import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Card from "@/common/components/Card/Card";
import classes from "@/common/styles/CandidateWrapper.module.css";
import { useCandidatesStore } from "@/store/candidates";
import { useNavigate } from "react-router-dom";

const NewCandidate = () => {
  const { addCandidate } = useCandidatesStore();

  const navigate = useNavigate();

  return (
    <div className={classes["candidate-wrapper"]}>
      <Card style={{ marginTop: "1rem", width: "100%" }}>
        <h2>New candidate</h2>
        <CandidateForm
          onCancel={() => {
            navigate(-1);
          }}
          onSubmit={(candidate) => {
            addCandidate(candidate);
            navigate(-1);
          }}
        />
      </Card>
    </div>
  );
};

export default NewCandidate;
