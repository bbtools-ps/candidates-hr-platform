import CandidateForm from "@/components/CandidateForm/CandidateForm";
import { useCandidatesStore } from "@/store/candidates";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function Component() {
  const { addCandidate } = useCandidatesStore();

  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <CandidateForm
      title={
        <>
          <span style={{ marginRight: "1rem" }}>
            <FontAwesomeIcon icon={faUserPlus} />
          </span>
          {t("NewCandidate_Label")}
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
