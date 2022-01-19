import useInputValidation from "../../hooks/use-input-validation";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import styles from "./CandidateForm.module.css";

const CandidateForm = ({
  candidateName,
  candidateDateOfBirth,
  candidateContactNumber,
  candidateEmail,
  candidateSkills,
  submitButtonText = "Add",
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  const {
    inputValue: name,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    inputIsValid: nameIsValid,
    hasError: nameError,
  } = useInputValidation((value) => value.trim() !== "", candidateName);
  const {
    inputValue: dateOfBirth,
    inputChangeHandler: dateOfBirthChangeHandler,
    inputBlurHandler: dateOfBirthBlurHandler,
    inputIsValid: dateofBirthIsValid,
    hasError: dateOfBirthError,
  } = useInputValidation((value) => value.trim() !== "", candidateDateOfBirth);
  const {
    inputValue: contactNumber,
    inputChangeHandler: contactNumberChangeHandler,
    inputBlurHandler: contactNumberBlurHandler,
    inputIsValid: contactNumberIsValid,
    hasError: contactNumberError,
  } = useInputValidation(
    (value) => value.trim() !== "",
    candidateContactNumber
  );
  const {
    inputValue: email,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    inputIsValid: emailIsValid,
    hasError: emailError,
  } = useInputValidation((value) => value.trim() !== "", candidateEmail);
  const {
    inputValue: skills,
    inputChangeHandler: skillsChangeHandler,
    inputBlurHandler: skillsBlurHandler,
    inputIsValid: skillsIsValid,
    hasError: skillsError,
  } = useInputValidation((value) => value.trim() !== "", candidateSkills);
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

  const setDateFormat = (selectedDate) => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}.${month}.${year}`;
  };

  const submitHandler = (e) => {
    const selectedDate = setDateFormat(dateOfBirth);
    e.preventDefault();
    const newCandidate = {
      name,
      dateOfBirth: selectedDate,
      contactNumber,
      email,
      skills,
    };
    onSubmit(newCandidate);
  };

  return (
    <form onSubmit={submitHandler}>
      <InputField
        label="Name"
        className={nameError ? styles.error : ""}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={name}
      />
      <InputField
        label="Date of birth"
        type="date"
        className={dateOfBirthError ? styles.error : ""}
        onChange={dateOfBirthChangeHandler}
        onBlur={dateOfBirthBlurHandler}
        value={dateOfBirth}
      />
      <InputField
        label="Contact number"
        className={contactNumberError ? styles.error : ""}
        onChange={contactNumberChangeHandler}
        onBlur={contactNumberBlurHandler}
        value={contactNumber}
      />
      <InputField
        label="E-mail"
        className={emailError ? styles.error : ""}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={email}
      />
      <InputField
        label="Skills"
        className={skillsError ? styles.error : ""}
        onChange={skillsChangeHandler}
        onBlur={skillsBlurHandler}
        value={skills}
      />
      <div className={styles["form-controls"]}>
        <Button type="submit" text={submitButtonText} disabled={!formIsValid} />
        <Button type="button" text="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};

export default CandidateForm;
