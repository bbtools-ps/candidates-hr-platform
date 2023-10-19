import { useState } from "react";

interface IUseInputValidation {
  validators: ((payload: string) => boolean)[];
  initialValue?: string;
}

export const useInputValidation = ({
  validators,
  initialValue = "",
}: IUseInputValidation) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const inputIsValid = validators.length
    ? validators.every((validator) => validator(inputValue))
    : null;
  const hasError = inputIsValid !== null ? !inputIsValid && isTouched : null;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
