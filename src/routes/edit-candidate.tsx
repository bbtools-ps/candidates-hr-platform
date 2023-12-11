import Protected from "@/common/components/Protected";
import CandidateForm from "@/components/CandidateForm/CandidateForm";
import { useCandidatesStore } from "@/store/candidates";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";

export function Component() {
  const { allCandidates, editCandidate } = useCandidatesStore();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Protected condition={location.state && !!allCandidates.length}>
      <CandidateForm
        title={
          <>
            <span style={{ marginRight: "1rem" }}>
              <FontAwesomeIcon icon={faEdit} />
            </span>
            Edit candidate
          </>
        }
        onSubmit={(candidate) => {
          editCandidate(candidate);
          navigate("..");
        }}
        candidate={location.state}
      />
    </Protected>
  );
}

Component.displayName = "EditCandidate";
