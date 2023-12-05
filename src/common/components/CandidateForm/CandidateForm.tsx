import { useInput, useTagsInput } from "@/common/hooks";
import { Candidate } from "@/common/models";
import {
  convertDate,
  validateDate,
  validateEmail,
  validateEmptyValue,
  validatePhoneNumber,
} from "@/common/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Button from "../Button/Button";
import Card from "../Card/Card";
import InputField from "../InputField/InputField";
import TagsInput from "../TagsInput/TagsInput";
import classes from "./CandidateForm.module.css";

interface ICandidateFormProps {
  title: React.ReactNode;
  candidate?: Candidate;
  onCancel?: () => void;
  onSubmit: (payload: Candidate) => void;
}

const CandidateForm: React.FC<ICandidateFormProps> = ({
  title,
  candidate,
  onCancel,
  onSubmit,
}) => {
  const navigate = useNavigate();

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
    initialValue: convertDate(candidate?.dateOfBirth),
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
      skills,
      id: candidate?.id || uuid(),
    };
    onSubmit(newCandidate);
  };

  return (
    <div className={classes["candidate-wrapper"]}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classes["backdrop"]}
        onClick={() => {
          navigate("..");
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        style={{ zIndex: 3 }}
      >
        <div className={classes.card}>
          <Card>
            <h2 data-cy="heading">{title}</h2>
            <form onSubmit={handleSubmit} className={classes["candidate-form"]}>
              <InputField
                id="candidate-name"
                label="Name"
                inputClass={nameError ? classes.error : ""}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={name}
                isValid={nameIsValid}
                data-cy="candidate-name"
              />
              {nameError && (
                <p className={classes.error} data-cy="invalid-name">
                  Please add a name.
                </p>
              )}
              <InputField
                id="candidate-date-of-birth"
                label="Date of birth"
                type="date"
                inputClass={dateOfBirthError ? classes.error : ""}
                onChange={dateOfBirthChangeHandler}
                onBlur={dateOfBirthBlurHandler}
                value={dateOfBirth}
                isValid={dateofBirthIsValid}
                checkmarkStyle={{ right: "3rem" }}
                data-cy="candidate-date-of-birth"
              />
              {dateOfBirthError && (
                <p className={classes.error} data-cy="invalid-date">
                  Please add a valid date.
                </p>
              )}
              <InputField
                id="candidate-contact-number"
                label="Contact number"
                inputClass={contactNumberError ? classes.error : ""}
                onChange={contactNumberChangeHandler}
                onBlur={contactNumberBlurHandler}
                value={contactNumber}
                isValid={contactNumberIsValid}
                data-cy="candidate-contact-number"
              />
              {contactNumberError && (
                <p className={classes.error} data-cy="invalid-phone">
                  Please add a valid phone number.
                </p>
              )}
              <InputField
                id="candidate-email"
                label="E-mail"
                inputClass={emailError ? classes.error : ""}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={email}
                isValid={emailIsValid}
                data-cy="candidate-email"
              />
              {emailError && (
                <p className={classes.error} data-cy="invalid-email">
                  Please add a valid email.
                </p>
              )}
              <TagsInput
                id="candidate-skills"
                label="Skills"
                placeholder="Press comma to add skills"
                tags={skills}
                value={skill}
                onChange={skillChangeHandler}
                onBlur={skillBlurHandler}
                onRemoveTags={removeTags}
                data-cy="candidate-skills"
                className={tagsError ? classes.error : ""}
              />
              {tagsError && (
                <p className={classes.error} data-cy="invalid-skills">
                  Please add skills.
                </p>
              )}
              <div className={classes["form-controls"]}>
                <Button
                  type="submit"
                  text={candidate ? "Save" : "Add"}
                  disabled={
                    !nameIsValid ||
                    !dateofBirthIsValid ||
                    !contactNumberIsValid ||
                    !emailIsValid ||
                    !skills.length
                  }
                  data-cy="submit-btn"
                />
                <Button
                  type="button"
                  text="Cancel"
                  onClick={() => {
                    if (onCancel) {
                      onCancel();
                    } else {
                      navigate("..");
                    }
                  }}
                  data-cy="cancel-btn"
                />
              </div>
            </form>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default CandidateForm;
