import { useState } from "react";

const useInputValidation = (validateValue = () => {}, initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const inputIsValid = validateValue ? validateValue(inputValue) : null;
  const hasError = inputIsValid !== null ? !inputIsValid && isTouched : null;

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetHandler = () => {
    setInputValue("");
    setIsTouched(false);
  };

  return {
    inputValue,
    inputChangeHandler,
    inputBlurHandler,
    resetHandler,
    ...(inputIsValid !== null && { inputIsValid }),
    ...(hasError !== null && { hasError }),
  };
};

export default useInputValidation;
