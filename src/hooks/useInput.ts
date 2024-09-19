import { useEffect, useState } from "react";

interface IUseInput {
  initialValue?: string;
  validationFn: (value: string) => boolean;
}

export const useInput = ({ initialValue, validationFn }: IUseInput) => {
  const [value, setValue] = useState(initialValue || "");
  const [isTouched, setIsTouched] = useState(false);
  const isValid = validationFn(value);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    onChange,
    onBlur,
    reset,
    isValid,
    hasError: isTouched && !isValid,
  };
};
