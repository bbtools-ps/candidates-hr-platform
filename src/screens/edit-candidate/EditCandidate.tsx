import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Card from "@/common/components/Card/Card";
import Protected from "@/common/components/Protected";
import classes from "@/common/styles/CandidateWrapper.module.css";
import { useCandidatesStore } from "@/store/candidates";
import { useLocation, useNavigate } from "react-router-dom";

const EditCandidate = () => {
  const { allCandidates, editCandidate } = useCandidatesStore();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Protected condition={location.state && !!allCandidates.length}>
      <div className={classes["candidate-wrapper"]}>
        <Card style={{ marginTop: "1rem", width: "100%" }}>
          <h2 data-cy="heading">Edit candidate</h2>
          <CandidateForm
            onCancel={() => {
              navigate("..");
            }}
            onSubmit={(candidate) => {
              editCandidate(candidate);
              navigate("..");
            }}
            candidate={location.state}
          />
        </Card>
      </div>
    </Protected>
  );
};

export default EditCandidate;
