import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

interface TextAreaFieldProps extends ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  hasError?: boolean;
  isRequired?: boolean;
}

export default function TextAreaField({
  label,
  id: idProp,
  rows = 3,
  hasError,
  isRequired,
  ...rest
}: TextAreaFieldProps) {
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
      <textarea
        rows={rows}
        id={idProp}
        className={cn(
          "w-full flex-1 truncate rounded border-2 border-solid border-gray px-4 py-2 text-base duration-100 hover:border-blue dark:border-slate-600 dark:hover:border-sky-400",
          hasError ? "border-red bg-rose-300" : "bg-transparent"
        )}
        aria-label={label}
        {...rest}
      />
    </>
  );
}
