import type { Candidate } from "@/models";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { useAppForm } from "../Form/hooks";
import Button from "../UI/Button/Button";
import Dialog, { type DialogActions } from "../UI/Dialog/Dialog";

const CandidateSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  dateOfBirth: z.string().date("Invalid date format"),
  contactNumber: z
    .string()
    .trim()
    .min(1, { message: "Contact number is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  skills: z
    .array(
      z.object({
        id: z.string(),
        value: z.string().trim().min(1, { message: "Skill is required" }),
      })
    )
    .min(1, { message: "Skills are required" }),
});

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
    },
    validators: { onSubmit: CandidateSchema },
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
              isRequired={
                !(CandidateSchema.shape.name instanceof z.ZodOptional)
              }
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
                !(CandidateSchema.shape.dateOfBirth instanceof z.ZodOptional)
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
                !(CandidateSchema.shape.contactNumber instanceof z.ZodOptional)
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
                !(CandidateSchema.shape.email instanceof z.ZodOptional)
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
                !(CandidateSchema.shape.skills instanceof z.ZodOptional)
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
