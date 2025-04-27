import type { ComponentPropsWithoutRef } from "react";

interface CheckboxProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "value" | "defaultValue"
  > {
  label?: string;
  isRequired?: boolean;
}

export default function Checkbox({
  label,
  id,
  isRequired,
  ...rest
}: CheckboxProps) {
  return (
    <div className="flex gap-3">
      <input type="checkbox" id={id} {...rest} />
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
    </div>
  );
}
