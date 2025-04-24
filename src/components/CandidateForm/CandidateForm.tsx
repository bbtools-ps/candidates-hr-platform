import type { Candidate } from "@/models";
import { useForm } from "@tanstack/react-form";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import Button from "../UI/Button/Button";
import Dialog, { type DialogActions } from "../UI/Dialog/Dialog";
import InputField from "../UI/InputField/InputField";
import TagsInput from "../UI/TagsInput/TagsInput";

interface IProps {
  title: React.ReactNode;
  candidate?: Candidate;
  onCancel?: () => void;
  onSubmit: (payload: Candidate) => void;
}

const CandidateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  skills: z
    .array(
      z.object({
        id: z.string(),
        value: z.string(),
      })
    )
    .min(1, { message: "Skills are required" }),
});

export default function CandidateForm({
  title,
  candidate,
  onCancel,
  onSubmit: onSubmitProp,
}: IProps) {
  const navigate = useNavigate();
  const dialog = useRef<DialogActions>(null);

  const form = useForm({
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <form.Field name="name">
          {(field) => (
            <InputField
              id="candidate-name"
              label="Name"
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors?.[0]?.message
                  : undefined
              }
              value={field.state.value}
              isRequired={
                !(CandidateSchema.shape.name instanceof z.ZodOptional)
              }
              onChange={(e) => field.handleChange(e.target.value)}
              data-cy="candidate-name"
            />
          )}
        </form.Field>
        <form.Field name="dateOfBirth">
          {(field) => (
            <InputField
              id="candidate-date-of-birth"
              label="Date of birth"
              type="date"
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors?.[0]?.message
                  : undefined
              }
              value={field.state.value}
              isRequired={
                !(CandidateSchema.shape.dateOfBirth instanceof z.ZodOptional)
              }
              onChange={(e) => field.handleChange(e.target.value)}
              data-cy="candidate-date-of-birth"
            />
          )}
        </form.Field>
        <form.Field name="contactNumber">
          {(field) => (
            <InputField
              id="candidate-contact-number"
              label="Contact number"
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors?.[0]?.message
                  : undefined
              }
              value={field.state.value}
              isRequired={
                !(CandidateSchema.shape.contactNumber instanceof z.ZodOptional)
              }
              onChange={(e) => field.handleChange(e.target.value)}
              data-cy="candidate-contact-number"
            />
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <InputField
              id="candidate-email"
              label="E-mail"
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors?.[0]?.message
                  : undefined
              }
              value={field.state.value}
              isRequired={
                !(CandidateSchema.shape.email instanceof z.ZodOptional)
              }
              onChange={(e) => field.handleChange(e.target.value)}
              data-cy="candidate-email"
            />
          )}
        </form.Field>
        <form.Field name="skills">
          {(field) => (
            <TagsInput
              id="candidate-skills"
              label="Skills"
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors?.[0]?.message
                  : undefined
              }
              tags={field.state.value}
              isRequired={
                !(CandidateSchema.shape.skills instanceof z.ZodOptional)
              }
              onRemove={field.removeValue}
              onAdd={(value) => {
                if (
                  field.state.value.some((tag) => tag.value === value.value)
                ) {
                  return;
                }
                field.pushValue(value);
              }}
              data-cy="candidate-skills"
            />
          )}
        </form.Field>
        <div className="mt-4 flex justify-center gap-4">
          <Button
            type="button"
            onClick={() => {
              if (onCancel) {
                onCancel();
              } else {
                navigate("..");
              }
            }}
            data-cy="cancel-btn"
            variant="outlined"
          >
            Cancel
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                data-cy="submit-btn"
              >
                {isSubmitting
                  ? candidate
                    ? "Saving..."
                    : "Adding..."
                  : candidate
                    ? "Save"
                    : "Add"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </Dialog>
  );
}
