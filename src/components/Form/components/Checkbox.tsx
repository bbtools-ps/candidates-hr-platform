import { useState } from "react";
import { v4 as uuid } from "uuid";
import CheckboxField from "../../UI/Checkbox/Checkbox";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface CheckboxProps {
  id?: string;
  label?: string;
  isRequired?: boolean;
}

export default function Checkbox({
  id: idProp,
  isRequired,
  label,
}: CheckboxProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<boolean>();

  return (
    <div>
      <CheckboxField
        id={id}
        label={label}
        isRequired={isRequired}
        onChange={(e) => field.handleChange(e.target.checked)}
        checked={field.state.value}
      />
      <FieldError meta={field.state.meta} />
    </div>
  );
}
