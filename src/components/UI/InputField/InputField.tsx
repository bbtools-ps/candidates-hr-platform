import { convertToKebabCase } from "@/utils";
import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

interface IProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  isRequired?: boolean;
}

export default function InputField({
  label,
  id: idProp,
  type = "text",
  error,
  isRequired,
  ...rest
}: IProps) {
  const id = idProp || convertToKebabCase(label);

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id}>
          {label}
          {isRequired && (
            <span aria-hidden="true" className="ml-1">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative flex flex-col">
        <input
          id={id}
          type={type}
          className={cn(
            "w-full flex-1 truncate rounded border-2 border-solid border-gray px-4 py-2 text-base duration-100 hover:border-blue dark:border-slate-600 dark:hover:border-sky-400",
            error ? "border-red bg-rose-300" : "bg-transparent",
            type === "date" && "date-input"
          )}
          aria-label={label}
          {...rest}
        />
        {error && (
          <p className="text-red dark:text-rose-400" data-cy={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
