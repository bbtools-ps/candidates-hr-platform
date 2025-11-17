import { useId } from "react";
import type { CheckboxProps } from "../../UI/Checkbox/Checkbox";
import Checkbox from "../../UI/Checkbox/Checkbox";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface CheckboxFieldProps
  extends Omit<
    CheckboxProps,
    "ref" | "checked" | "onChange" | "onBlur" | "id"
  > {
  "data-cy"?: string;
}

export default function CheckboxField({
  isRequired,
  label,
  "data-cy": dataCy,
  ...rest
}: CheckboxFieldProps) {
  const id = useId();
  const field = useFieldContext<boolean>();

  return (
    <div>
      <Checkbox
        id={id}
        label={label}
        isRequired={isRequired}
        onChange={(e) => field.handleChange(e.target.checked)}
        checked={field.state.value}
        onBlur={field.handleBlur}
        data-cy={dataCy}
        {...rest}
      />
      <FieldError meta={field.state.meta} data-cy={dataCy} />
    </div>
  );
}
