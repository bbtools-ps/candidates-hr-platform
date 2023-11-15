import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import { useCandidatesStore } from "@/store/candidates";
import { useNavigate } from "react-router-dom";

const NewCandidate = () => {
  const { addCandidate } = useCandidatesStore();

  const navigate = useNavigate();

  return (
    <CandidateForm
      title="New candidate"
      onSubmit={(candidate) => {
        addCandidate(candidate);
        navigate("..");
      }}
    />
  );
};

export default NewCandidate;
