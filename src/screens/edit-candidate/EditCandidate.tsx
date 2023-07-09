import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Card from "@/common/components/Card/Card";
import { Candidate } from "@/common/models";
import classes from "@/common/styles/CandidateWrapper.module.css";

interface IEditCandidateProps {
  candidate: Candidate;
  onCancel: () => void;
  onSubmit: (payload: Candidate) => void;
}

const EditCandidate: React.FC<IEditCandidateProps> = ({
  candidate,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className={classes["candidate-wrapper"]}>
      <Card display="grid" style={{ marginTop: "1rem" }}>
        <h2>Edit candidate</h2>
        <CandidateForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          candidate={candidate}
        />
      </Card>
    </div>
  );
};

export default EditCandidate;
