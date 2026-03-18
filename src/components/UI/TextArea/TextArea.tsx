import { cn } from "@/utils/cn";
import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";

export interface TextAreaProps extends ComponentPropsWithRef<"textarea"> {
  label?: string;
  hasError?: boolean;
  isRequired?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { label, id, rows = 3, hasError, isRequired, ...rest }: TextAreaProps,
    ref
  ) {
    return (
      <>
        {label && id && (
          <label htmlFor={id}>
            {label}
            {isRequired && (
              <span aria-hidden="true" className="ml-1">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={cn(
            "border-gray hover:border-blue w-full flex-1 truncate rounded-sm border-2 border-solid px-4 py-2 text-base duration-100 dark:border-slate-600 dark:hover:border-sky-400",
            hasError ? "border-red bg-rose-300" : "bg-transparent"
          )}
          aria-label={label}
          {...rest}
        />
      </>
    );
  }
);

export default TextArea;
