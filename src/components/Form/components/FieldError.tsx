import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

interface FieldErrorProps {
  meta: AnyFieldMeta;
}

export default function FieldError({ meta }: FieldErrorProps) {
  const errors = meta.errors as ZodError[] | undefined;
  const message = meta.isTouched ? errors?.[0]?.message : undefined;

  return (
    <p className="text-red dark:text-rose-400" data-cy="field-error">
      {message}
    </p>
  );
}
