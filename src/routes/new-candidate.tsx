import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import { useCandidatesStore } from "@/store/candidates";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export function Component() {
  const { addCandidate } = useCandidatesStore();

  const navigate = useNavigate();

  return (
    <CandidateForm
      title={
        <>
          <span style={{ marginRight: "1rem" }}>
            <FontAwesomeIcon icon={faUserPlus} />
          </span>
          New candidate
        </>
      }
      onSubmit={(candidate) => {
        addCandidate(candidate);
        navigate("..");
      }}
    />
  );
}

Component.displayName = "NewCandidate";
