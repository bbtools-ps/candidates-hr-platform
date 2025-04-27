import CandidateForm from "@/components/CandidateForm/CandidateForm";
import Protected from "@/components/Protected";
import { useCandidatesStore } from "@/store/candidates";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

export function Component() {
  const { allCandidates, editCandidate } = useCandidatesStore();

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Protected condition={location.state?.candidate && !!allCandidates.length}>
      <CandidateForm
        title={
          <>
            <span style={{ marginRight: "1rem" }}>
              <FontAwesomeIcon icon={faEdit} />
            </span>
            {t("EditCandidate_Label")}
          </>
        }
        onSubmit={(candidate) => {
          editCandidate(candidate);
          navigate(-1);
        }}
        candidate={location.state?.candidate}
      />
    </Protected>
  );
}

Component.displayName = "EditCandidate";
