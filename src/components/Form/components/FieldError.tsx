import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

interface FieldErrorProps {
  meta: AnyFieldMeta;
  "data-cy"?: string;
}

export default function FieldError({
  meta,
  "data-cy": dataCy,
}: FieldErrorProps) {
  const errors = meta.errors as ZodError[] | undefined;
  const message = meta.isTouched ? errors?.[0]?.message : undefined;

  return (
    <p
      className="text-red dark:text-rose-400"
      data-cy={dataCy ? `${dataCy}-error` : "field-error"}
    >
      {message}
    </p>
  );
}
