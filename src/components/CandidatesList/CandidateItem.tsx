import type { Candidate } from "@/models";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Button from "../UI/Button/Button";
import ToggleFavoriteButton from "../UI/ToggleFavoriteButton/ToggleFavoriteButton";

interface CandidateItemProps {
  candidate: Candidate;
  onToggleFavorite: (candidateId: string) => void;
  onRemoveCandidate: (candidateId: string) => void;
}

export default function CandidateItem({
  candidate,
  onToggleFavorite,
  onRemoveCandidate,
}: CandidateItemProps) {
  const { t } = useTranslation();

  return (
    <article
      className="m-2 flex w-full flex-col rounded bg-white p-4 text-black shadow-sm dark:border dark:border-solid dark:border-slate-600 dark:bg-slate-900 dark:text-white md:w-1/2 xl:w-1/3"
      data-cy={candidate.name}
    >
      <div className="mb-4 flex items-center">
        <h2 className="flex-1 text-center">{candidate.name}</h2>
        <ToggleFavoriteButton
          isFavorite={candidate.isFavorite}
          onToggleFavorite={onToggleFavorite.bind(null, candidate.id)}
          label={t("AddToFavorites_Label")}
        />
      </div>
      <div className="mb-2 flex flex-1 flex-col gap-2">
        <p data-testid="date-of-birth">
          <strong className="mr-2 dark:text-sky-400">
            {t("DateOfBirth_Label")}
          </strong>
          <span>{dayjs(candidate.dateOfBirth).format("MM/DD/YYYY")}</span>
        </p>
        <p data-testid="contact-number">
          <strong className="mr-2 dark:text-sky-400">
            {t("ContactNumber_Label")}
          </strong>
          <span>{candidate.contactNumber}</span>
        </p>
        <p data-testid="email">
          <strong className="mr-2 dark:text-sky-400">{t("Email_Label")}</strong>
          <span>{candidate.email}</span>
        </p>
        <p data-testid="skills" className="flex flex-wrap gap-2">
          <strong className="dark:text-sky-400">{t("Skills_Label")}</strong>
          {candidate.skills?.map(({ value, id }) => (
            <span
              key={id}
              className="rounded border border-solid border-blue px-2 py-1 dark:border-sky-600"
            >
              {value}
            </span>
          ))}
        </p>
        {candidate.notes && (
          <p data-testid="notes">
            <strong className="mr-2 dark:text-sky-400">
              {t("Notes_Label")}
            </strong>
            <span>{candidate.notes}</span>
          </p>
        )}
      </div>
      <div className="flex gap-4 self-end lg:flex-row">
        <Link
          to="/edit-candidate"
          state={{ candidate }}
          className="link-button-outlined"
          data-cy="edit-candidate-btn"
          data-testid="edit-button"
        >
          <FontAwesomeIcon icon={faEdit} />
          {t("Edit_Label")}
        </Link>
        <Button
          icon="remove"
          onClick={onRemoveCandidate.bind(null, candidate.id)}
          data-cy="remove-candidate-btn"
          data-testid="remove-button"
          variant="red"
        >
          {t("Delete_Label")}
        </Button>
      </div>
    </article>
  );
}
