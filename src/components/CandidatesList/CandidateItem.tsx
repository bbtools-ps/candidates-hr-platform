import type { Candidate } from "@/models";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Button from "../UI/Button/Button";

interface CandidateItemProps {
  candidate: Candidate;
  onRemoveCandidate: (payload: string) => void;
  onEditCandidate: (payload: Candidate) => void;
}

export default function CandidateItem({
  candidate,
  onRemoveCandidate,
  onEditCandidate,
}: CandidateItemProps) {
  const { t } = useTranslation();

  return (
    <article
      className="m-2 flex w-full flex-col rounded bg-white p-4 text-black shadow-sm dark:border dark:border-solid dark:border-slate-600 dark:bg-slate-900 dark:text-white md:w-1/2 xl:w-1/3"
      data-cy={candidate.name}
    >
      <h2 className="mb-4">{candidate.name}</h2>
      <div className="mb-2 flex flex-1 flex-col gap-2">
        <p>
          <strong className="mr-2 dark:text-sky-400">
            {t("DateOfBirth_Label")}
          </strong>
          <span>{dayjs(candidate.dateOfBirth).format("MM/DD/YYYY")}</span>
        </p>
        <p>
          <strong className="mr-2 dark:text-sky-400">
            {t("ContactNumber_Label")}
          </strong>
          <span>{candidate.contactNumber}</span>
        </p>
        <p>
          <strong className="mr-2 dark:text-sky-400">{t("Email_Label")}</strong>
          <span>{candidate.email}</span>
        </p>
        <p className="flex flex-wrap gap-2">
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
          <p>
            <strong className="mr-2 dark:text-sky-400">
              {t("Notes_Label")}
            </strong>
            <span>{candidate.notes}</span>
          </p>
        )}
      </div>
      <div className="flex gap-4 self-end lg:flex-row">
        <Button
          icon="edit"
          onClick={() => {
            onEditCandidate(candidate);
          }}
          data-cy="edit-candidate-btn"
          variant="outlined"
        >
          {t("Edit_Label")}
        </Button>
        <Button
          icon="remove"
          onClick={() => {
            if (!candidate.id) return;

            onRemoveCandidate(candidate.id);
          }}
          data-cy="remove-candidate-btn"
          variant="red"
        >
          {t("Delete_Label")}
        </Button>
      </div>
    </article>
  );
}
