import { useInput, useTagsInput } from "@/hooks";
import type { Candidate } from "@/models";
import {
  validateDate,
  validateEmail,
  validateEmptyValue,
  validatePhoneNumber,
} from "@/utils";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
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

export default function CandidateForm({
  title,
  candidate,
  onCancel,
  onSubmit,
}: IProps) {
  const navigate = useNavigate();
  const dialog = useRef<DialogActions>(null);

  const {
    value: name,
    onChange: nameChangeHandler,
    onBlur: nameBlurHandler,
    isValid: nameIsValid,
    hasError: nameError,
  } = useInput({
    initialValue: candidate?.name,
    validationFn: (value) => validateEmptyValue(value),
  });
  const {
    value: dateOfBirth,
    onChange: dateOfBirthChangeHandler,
    onBlur: dateOfBirthBlurHandler,
    isValid: dateofBirthIsValid,
    hasError: dateOfBirthError,
  } = useInput({
    initialValue: candidate?.dateOfBirth
      ? new Date(candidate?.dateOfBirth)?.toISOString().slice(0, 10)
      : "",
    validationFn: (value) => validateDate(value),
  });
  const {
    value: contactNumber,
    onChange: contactNumberChangeHandler,
    onBlur: contactNumberBlurHandler,
    isValid: contactNumberIsValid,
    hasError: contactNumberError,
  } = useInput({
    initialValue: candidate?.contactNumber,
    validationFn: (value) => validatePhoneNumber(value),
  });
  const {
    value: email,
    onChange: emailChangeHandler,
    onBlur: emailBlurHandler,
    isValid: emailIsValid,
    hasError: emailError,
  } = useInput({
    initialValue: candidate?.email,
    validationFn: (value) => validateEmptyValue(value) && validateEmail(value),
  });
  const {
    tags: skills,
    value: skill,
    onChange: skillChangeHandler,
    onBlur: skillBlurHandler,
    removeTags,
    hasError: tagsError,
  } = useTagsInput(candidate?.skills);

  useEffect(() => {
    dialog.current?.open();
  }, []);

  const setDateFormat = (selectedDate: string) => {
    return new Date(selectedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedDate = setDateFormat(dateOfBirth);
    const newCandidate = {
      name,
      dateOfBirth: selectedDate,
      contactNumber,
      email,
      skills,
      id: candidate?.id || uuid(),
    };
    onSubmit(newCandidate);
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
        <InputField
          id="candidate-name"
          label="Name"
          error={nameError ? "Please add a name." : undefined}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={name}
          isValid={nameIsValid}
          data-cy="candidate-name"
        />
        <InputField
          id="candidate-date-of-birth"
          label="Date of birth"
          type="date"
          error={dateOfBirthError ? "Please add a valid date." : undefined}
          onChange={dateOfBirthChangeHandler}
          onBlur={dateOfBirthBlurHandler}
          value={dateOfBirth}
          isValid={dateofBirthIsValid}
          data-cy="candidate-date-of-birth"
        />
        <InputField
          id="candidate-contact-number"
          label="Contact number"
          error={
            contactNumberError ? "Please add a valid phone number." : undefined
          }
          onChange={contactNumberChangeHandler}
          onBlur={contactNumberBlurHandler}
          value={contactNumber}
          isValid={contactNumberIsValid}
          data-cy="candidate-contact-number"
        />
        <InputField
          id="candidate-email"
          label="E-mail"
          error={emailError ? "Please add a valid email." : undefined}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
          isValid={emailIsValid}
          data-cy="candidate-email"
        />
        <TagsInput
          id="candidate-skills"
          label="Skills"
          placeholder="Press comma to add skills"
          tags={skills}
          value={skill}
          onChange={skillChangeHandler}
          onBlur={skillBlurHandler}
          onRemoveTags={removeTags}
          error={tagsError ? "Please add skills." : undefined}
          data-cy="candidate-skills"
        />
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
          <Button
            type="submit"
            disabled={
              !nameIsValid ||
              !dateofBirthIsValid ||
              !contactNumberIsValid ||
              !emailIsValid ||
              !skills.length
            }
            data-cy="submit-btn"
          >
            {candidate ? "Save" : "Add"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
