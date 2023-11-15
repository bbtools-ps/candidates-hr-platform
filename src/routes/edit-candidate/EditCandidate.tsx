import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Protected from "@/common/components/Protected";
import { useCandidatesStore } from "@/store/candidates";
import { useLocation, useNavigate } from "react-router-dom";

const EditCandidate = () => {
  const { allCandidates, editCandidate } = useCandidatesStore();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Protected condition={location.state && !!allCandidates.length}>
      <CandidateForm
        title="Edit candidate"
        onSubmit={(candidate) => {
          editCandidate(candidate);
          navigate("..");
        }}
        candidate={location.state}
      />
    </Protected>
  );
};

export default EditCandidate;
