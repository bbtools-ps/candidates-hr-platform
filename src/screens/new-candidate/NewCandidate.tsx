import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Card from "@/common/components/Card/Card";
import Protected from "@/common/components/Protected";
import classes from "@/common/styles/CandidateWrapper.module.css";
import { useCandidatesStore } from "@/store/candidates";
import { useNavigate } from "react-router-dom";

const NewCandidate = () => {
  const { allCandidates, addCandidate } = useCandidatesStore();

  const navigate = useNavigate();

  return (
    <Protected condition={!!allCandidates.length}>
      <div className={classes["candidate-wrapper"]}>
        <Card style={{ marginTop: "1rem", width: "100%" }}>
          <h2 data-cy="heading">New candidate</h2>
          <CandidateForm
            onCancel={() => {
              navigate("..");
            }}
            onSubmit={(candidate) => {
              addCandidate(candidate);
              navigate("..");
            }}
          />
        </Card>
      </div>
    </Protected>
  );
};

export default NewCandidate;
