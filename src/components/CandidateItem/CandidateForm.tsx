import { validateEmail, validateEmptyValue } from "../../functions/utils";
import useInputValidation from "../../hooks/use-input-validation";
import { Candidate } from "../../models/Candidate";
import Button from "../UI/Button";
import InputField from "../UI/InputField";
import styles from "./CandidateForm.module.css";

interface CandidateFormProps {
  candidate?: Candidate;
  submitButtonText?: string;
  newCandidateId?: string;
  onCancel: () => void;
  onSubmit: (payload: Candidate) => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({
  candidate,
  submitButtonText = "Add",
  newCandidateId,
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  const convertedDate = candidate?.dateOfBirth
    ? candidate.dateOfBirth
        .match(/\d+/g)
        .reverse()
        .map((item) => {
          return parseInt(item) < 10 ? (item = "0" + item) : item;
        })
        .join("-")
    : "";
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
    validators: [validateEmptyValue],
    initialValue: convertedDate,
  });
  const {
    inputValue: contactNumber,
    inputChangeHandler: contactNumberChangeHandler,
    inputBlurHandler: contactNumberBlurHandler,
    inputIsValid: contactNumberIsValid,
    hasError: contactNumberError,
  } = useInputValidation({
    validators: [validateEmptyValue],
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
  const {
    inputValue: skills,
    inputChangeHandler: skillsChangeHandler,
    inputBlurHandler: skillsBlurHandler,
    inputIsValid: skillsIsValid,
    hasError: skillsError,
  } = useInputValidation({
    validators: [validateEmptyValue],
    initialValue: candidate?.skills,
  });
  let formIsValid = false;

  if (
    nameIsValid &&
    dateofBirthIsValid &&
    contactNumberIsValid &&
    emailIsValid &&
    skillsIsValid
  ) {
    formIsValid = true;
  }

  const setDateFormat = (selectedDate: string) => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}.${month}.${year}`;
  };

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    const selectedDate = setDateFormat(dateOfBirth);
    e.preventDefault();
    const newCandidate = {
      name,
      dateOfBirth: selectedDate,
      contactNumber,
      email,
      skills,
      id: newCandidateId || candidate.id,
    };
    onSubmit(newCandidate);
  };

  return (
    <form onSubmit={submitHandler} className={styles["candidate-form"]}>
      <InputField
        label="Name"
        className={nameError ? styles.error : ""}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={name}
        id="candidate-name"
      />
      {nameError && <p className={styles.error}>Please fill out this field.</p>}
      <InputField
        label="Date of birth"
        type="date"
        className={dateOfBirthError ? styles.error : ""}
        onChange={dateOfBirthChangeHandler}
        onBlur={dateOfBirthBlurHandler}
        value={dateOfBirth}
        id="candidate-date-of-birth"
      />
      {dateOfBirthError && (
        <p className={styles.error}>Please fill out this field.</p>
      )}
      <InputField
        label="Contact number"
        className={contactNumberError ? styles.error : ""}
        onChange={contactNumberChangeHandler}
        onBlur={contactNumberBlurHandler}
        value={contactNumber}
        id="candidate-contact-number"
      />
      {contactNumberError && (
        <p className={styles.error}>Please fill out this field.</p>
      )}
      <InputField
        label="E-mail"
        className={emailError ? styles.error : ""}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={email}
        id="candidate-email"
      />
      {emailError && (
        <p className={styles.error}>
          Please fill out this field with valid email.
        </p>
      )}
      <InputField
        label="Skills"
        className={skillsError ? styles.error : ""}
        onChange={skillsChangeHandler}
        onBlur={skillsBlurHandler}
        value={skills}
        id="candidate-skills"
      />
      {skillsError && (
        <p className={styles.error}>Please fill out this field.</p>
      )}
      <div className={styles["form-controls"]}>
        <Button type="submit" text={submitButtonText} disabled={!formIsValid} />
        <Button type="button" text="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};

export default CandidateForm;
