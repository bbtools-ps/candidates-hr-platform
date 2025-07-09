import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";

export interface CheckboxProps
  extends Omit<ComponentPropsWithRef<"input">, "type"> {
  label?: string;
  isRequired?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, isRequired, ...rest },
  ref
) {
  return (
    <div className="flex gap-3">
      <input ref={ref} type="checkbox" id={id} {...rest} />
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
});

export default Checkbox;
