import { cn } from "@/utils/cn";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface TextAreaFieldProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  id?: string;
  label?: string;
  isRequired?: boolean;
}

export default function TextAreaField({
  id: idProp,
  label,
  isRequired,
  ...rest
}: TextAreaFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<string>();

  return (
    <div>
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
      <textarea
        rows={3}
        {...rest}
        id={id}
        className={cn(
          "w-full flex-1 truncate rounded border-2 border-solid border-gray px-4 py-2 text-base duration-100 hover:border-blue dark:border-slate-600 dark:hover:border-sky-400",
          field.state.meta.isTouched && field.state.meta.errors.length > 0
            ? "border-red bg-rose-300"
            : "bg-transparent"
        )}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldError meta={field.state.meta} />
    </div>
  );
}
