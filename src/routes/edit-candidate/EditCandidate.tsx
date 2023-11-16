import CandidateForm from "@/common/components/CandidateForm/CandidateForm";
import Protected from "@/common/components/Protected";
import { useCandidatesStore } from "@/store/candidates";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";

const EditCandidate = () => {
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
};

export default EditCandidate;
