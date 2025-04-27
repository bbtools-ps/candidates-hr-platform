import { CANDIDATE_SCHEMA } from "@/constants";
import type { Candidate } from "@/models";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { ZodOptional } from "zod";
import { useAppForm } from "../Form/hooks";
import Button from "../UI/Button/Button";
import Dialog, { type DialogActions } from "../UI/Dialog/Dialog";

interface CandidateFormProps {
  title: React.ReactNode;
  candidate?: Candidate;
  onSubmit: (payload: Candidate) => void;
}

export default function CandidateForm({
  title,
  candidate,
  onSubmit: onSubmitProp,
}: CandidateFormProps) {
  const navigate = useNavigate();
  const dialog = useRef<DialogActions>(null);

  const { t } = useTranslation();

  const form = useAppForm({
    defaultValues: {
      name: candidate?.name || "",
      dateOfBirth: candidate?.dateOfBirth
        ? new Date(candidate?.dateOfBirth)?.toISOString().slice(0, 10)
        : "",
      contactNumber: candidate?.contactNumber || "",
      email: candidate?.email || "",
      skills: candidate?.skills || [],
      ...(candidate?.notes && { notes: candidate.notes }),
    },
    validators: { onSubmit: CANDIDATE_SCHEMA },
    onSubmit: ({ value }) => {
      onSubmitProp({
        ...value,
        id: candidate?.id || uuid(),
        isFavorite: candidate?.isFavorite || false,
      });
    },
  });

  useEffect(() => {
    dialog.current?.open();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    form.handleSubmit();
  };

  return (
    <Dialog
      ref={dialog}
      onClose={() => {
        navigate("..");
      }}
    >
      <h2 data-cy="heading">{title}</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              id="candidate-name"
              label={t("Name_Label")}
              isRequired={!(CANDIDATE_SCHEMA.shape.name instanceof ZodOptional)}
            />
          )}
        </form.AppField>
        <form.AppField name="dateOfBirth">
          {(field) => (
            <field.DateField
              id="candidate-date-of-birth"
              label={t("DateOfBirthForm_Label")}
              isRequired={
                !(CANDIDATE_SCHEMA.shape.dateOfBirth instanceof ZodOptional)
              }
            />
          )}
        </form.AppField>
        <form.AppField name="contactNumber">
          {(field) => (
            <field.TextField
              id="candidate-contact-number"
              label={t("ContactNumberForm_Label")}
              isRequired={
                !(CANDIDATE_SCHEMA.shape.contactNumber instanceof ZodOptional)
              }
            />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              id="candidate-email"
              label={t("EmailForm_Label")}
              isRequired={
                !(CANDIDATE_SCHEMA.shape.email instanceof ZodOptional)
              }
            />
          )}
        </form.AppField>
        <form.AppField name="skills">
          {(field) => (
            <field.TagsField
              id="skills"
              label={t("SkillsForm_Label")}
              placeholder={t("SkillsFormPlaceholder_Label")}
              removeTagLabel={t("RemoveSkill_Label")}
              isRequired={
                !(CANDIDATE_SCHEMA.shape.skills instanceof ZodOptional)
              }
            />
          )}
        </form.AppField>
        <form.AppField name="notes">
          {(field) => (
            <field.TextAreaField
              id="notes"
              label={t("NotesForm_Label")}
              isRequired={
                !(CANDIDATE_SCHEMA.shape.notes instanceof ZodOptional)
              }
            />
          )}
        </form.AppField>
        <div className="mt-4 flex justify-center gap-4">
          <Button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            variant="outlined"
          >
            {t("Cancel_Label")}
          </Button>
          <form.AppForm>
            <form.SubmitButton
              childrenRenderer={(isSubmitting) =>
                isSubmitting
                  ? candidate
                    ? t("Saving_Label")
                    : t("Adding_Label")
                  : candidate
                    ? t("Save_Label")
                    : t("Add_Label")
              }
            />
          </form.AppForm>
        </div>
      </form>
    </Dialog>
  );
}
