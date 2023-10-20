import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Card from "@/common/components/Card/Card";
import classes from "@/common/styles/CandidateWrapper.module.css";
import { useCandidatesStore } from "@/store/candidates";
import { useLocation, useNavigate } from "react-router-dom";

const EditCandidate = () => {
  const { editCandidate } = useCandidatesStore();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={classes["candidate-wrapper"]}>
      <Card style={{ marginTop: "1rem", width: "100%" }}>
        <h2>Edit candidate</h2>
        <CandidateForm
          onCancel={() => {
            navigate(-1);
          }}
          onSubmit={(candidate) => {
            editCandidate(candidate);
            navigate(-1);
          }}
          candidate={location.state}
        />
      </Card>
    </div>
  );
};

export default EditCandidate;
