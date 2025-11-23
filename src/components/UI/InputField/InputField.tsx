import { cn } from "@/utils/cn";
import { forwardRef, type ComponentPropsWithRef } from "react";

export interface InputFieldProps extends ComponentPropsWithRef<"input"> {
  label?: string;
  hasError?: boolean;
  isRequired?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({
    label,
    id: idProp,
    type = "text",
    hasError,
    isRequired,
    ...rest
  }: InputFieldProps) {
    return (
      <>
        {label && (
          <label htmlFor={idProp}>
            {label}
            {isRequired && (
              <span aria-hidden="true" className="ml-1">
                *
              </span>
            )}
          </label>
        )}
        <input
          id={idProp}
          type={type}
          className={cn(
            "border-gray hover:border-blue w-full flex-1 truncate rounded-sm border-2 border-solid px-4 py-2 text-base duration-100 dark:border-slate-600 dark:hover:border-sky-400",
            hasError ? "border-red bg-rose-300" : "bg-transparent",
            type === "date" && "date-input"
          )}
          aria-label={label}
          {...rest}
        />
      </>
    );
  }
);

export default InputField;
