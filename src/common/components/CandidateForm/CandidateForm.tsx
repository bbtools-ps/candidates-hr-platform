import useInputValidation from "@/common/hooks/useInputValidation";
import { Candidate } from "@/common/models";
import {
  convertDate,
  validateDate,
  validateEmail,
  validateEmptyValue,
  validatePhoneNumber,
} from "@/common/utils";
import { v4 as uuid } from "uuid";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import TagsInput from "../TagsInput/TagsInput";
import classes from "./CandidateForm.module.css";

interface ICandidateFormProps {
  candidate?: Candidate;
  onCancel: () => void;
  onSubmit: (payload: Candidate) => void;
}

const CandidateForm: React.FC<ICandidateFormProps> = ({
  candidate,
  onCancel,
  onSubmit,
}) => {
  const {
    inputValue: name,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    inputIsValid: nameIsValid,
    hasError: nameError,
  } = useInputValidation({
    validators: [validateEmptyValue],
    initialValue: candidate?.name,
  });
  const {
    inputValue: dateOfBirth,
    inputChangeHandler: dateOfBirthChangeHandler,
    inputBlurHandler: dateOfBirthBlurHandler,
    inputIsValid: dateofBirthIsValid,
    hasError: dateOfBirthError,
  } = useInputValidation({
    validators: [validateDate],
    initialValue: convertDate(candidate?.dateOfBirth),
  });
  const {
    inputValue: contactNumber,
    inputChangeHandler: contactNumberChangeHandler,
    inputBlurHandler: contactNumberBlurHandler,
    inputIsValid: contactNumberIsValid,
    hasError: contactNumberError,
  } = useInputValidation({
    validators: [validatePhoneNumber],
    initialValue: candidate?.contactNumber,
  });
  const {
    inputValue: email,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    inputIsValid: emailIsValid,
    hasError: emailError,
  } = useInputValidation({
    validators: [validateEmptyValue, validateEmail],
    initialValue: candidate?.email,
  });
  let formIsValid = false;

  if (
    nameIsValid &&
    dateofBirthIsValid &&
    contactNumberIsValid &&
    emailIsValid
  ) {
    formIsValid = true;
  }

  const setDateFormat = (selectedDate: string) => {
    return new Date(selectedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedDate = setDateFormat(dateOfBirth);
    const newCandidate = {
      name,
      dateOfBirth: selectedDate,
      contactNumber,
      email,
      skills: [],
      id: candidate?.id || uuid(),
    };
    onSubmit(newCandidate);
  };

  return (
    <form onSubmit={handleSubmit} className={classes["candidate-form"]}>
      <InputField
        id="candidate-name"
        label="Name"
        className={nameError ? classes.error : ""}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={name}
        isValid={nameIsValid}
      />
      {nameError && (
        <p className={classes.error}>Please fill out this field.</p>
      )}
      <InputField
        id="candidate-date-of-birth"
        label="Date of birth"
        type="date"
        className={dateOfBirthError ? classes.error : ""}
        onChange={dateOfBirthChangeHandler}
        onBlur={dateOfBirthBlurHandler}
        value={dateOfBirth}
        isValid={dateofBirthIsValid}
        checkmarkStyle={{ right: "3rem" }}
      />
      {dateOfBirthError && (
        <p className={classes.error}>
          Please fill out this field with a valid date.
        </p>
      )}
      <InputField
        id="candidate-contact-number"
        label="Contact number"
        className={contactNumberError ? classes.error : ""}
        onChange={contactNumberChangeHandler}
        onBlur={contactNumberBlurHandler}
        value={contactNumber}
        isValid={contactNumberIsValid}
      />
      {contactNumberError && (
        <p className={classes.error}>
          Please fill out this field with a valid phone number.
        </p>
      )}
      <InputField
        id="candidate-email"
        label="E-mail"
        className={emailError ? classes.error : ""}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={email}
        isValid={emailIsValid}
      />
      {emailError && (
        <p className={classes.error}>
          Please fill out this field with a valid email.
        </p>
      )}
      {/* <InputField
        id="candidate-skills"
        label="Skills"
        className={skillsError ? classes.error : ""}
        onChange={skillsChangeHandler}
        onBlur={skillsBlurHandler}
        value={skills}
        isValid={skillsIsValid}
      />
      {skillsError && (
        <p className={classes.error}>Please fill out this field.</p>
      )} */}
      <TagsInput
        id="candidate-skills"
        label="Skills"
        placeholder="Press comma to add skills"
      />
      <div className={classes["form-controls"]}>
        <Button
          type="submit"
          text={candidate ? "Save" : "Add"}
          disabled={!formIsValid}
        />
        <Button type="button" text="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};

export default CandidateForm;
