import { useState } from "react";
import { v4 as uuid } from "uuid";
import Checkbox from "../../UI/Checkbox/Checkbox";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface CheckboxFieldProps {
  id?: string;
  label?: string;
  isRequired?: boolean;
}

export default function CheckboxField({
  id: idProp,
  isRequired,
  label,
}: CheckboxFieldProps) {
  const [id] = useState(idProp ?? uuid());
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
      />
      <FieldError meta={field.state.meta} />
    </div>
  );
}
