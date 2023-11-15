import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Protected from "@/common/components/Protected";
import { useCandidatesStore } from "@/store/candidates";
import { useNavigate } from "react-router-dom";

const NewCandidate = () => {
  const { allCandidates, addCandidate } = useCandidatesStore();

  const navigate = useNavigate();

  return (
    <Protected condition={!!allCandidates.length}>
      <CandidateForm
        title="New candidate"
        onSubmit={(candidate) => {
          addCandidate(candidate);
          navigate("..");
        }}
      />
    </Protected>
  );
};

export default NewCandidate;
