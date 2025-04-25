import { CANDIDATE_SCHEMA } from "@/constants";
import type { Candidate } from "@/models";
import { useEffect, useRef } from "react";
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
      onSubmitProp({ ...value, id: candidate?.id || uuid() });
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
            <field.InputField
              id="candidate-name"
              label="Name"
              isRequired={!(CANDIDATE_SCHEMA.shape.name instanceof ZodOptional)}
              data-cy="candidate-name"
            />
          )}
        </form.AppField>
        <form.AppField name="dateOfBirth">
          {(field) => (
            <field.InputField
              id="candidate-date-of-birth"
              label="Date of birth"
              type="date"
              isRequired={
                !(CANDIDATE_SCHEMA.shape.dateOfBirth instanceof ZodOptional)
              }
              data-cy="candidate-date-of-birth"
            />
          )}
        </form.AppField>
        <form.AppField name="contactNumber">
          {(field) => (
            <field.InputField
              id="candidate-contact-number"
              label="Contact number"
              data-cy="candidate-contact-number"
              isRequired={
                !(CANDIDATE_SCHEMA.shape.contactNumber instanceof ZodOptional)
              }
            />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.InputField
              id="candidate-email"
              label="E-mail"
              data-cy="candidate-email"
              isRequired={
                !(CANDIDATE_SCHEMA.shape.email instanceof ZodOptional)
              }
            />
          )}
        </form.AppField>
        <form.AppField name="skills">
          {(field) => (
            <field.TagsInputField
              id="skills"
              label="Skills"
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
              label="Notes"
              data-cy="candidate-notes"
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
              navigate("..");
            }}
            data-cy="cancel-btn"
            variant="outlined"
          >
            Cancel
          </Button>
          <form.AppForm>
            <form.SubmitButton
              childrenRenderer={(isSubmitting) =>
                isSubmitting
                  ? candidate
                    ? "Saving..."
                    : "Adding..."
                  : candidate
                    ? "Save"
                    : "Add"
              }
            />
          </form.AppForm>
        </div>
      </form>
    </Dialog>
  );
}
