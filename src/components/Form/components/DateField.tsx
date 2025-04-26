import InputField from "@/components/UI/InputField/InputField";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface DateFieldProps {
  id?: string;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function DateField({
  id: idProp,
  label,
  isRequired,
  placeholder,
}: DateFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<string>();

  return (
    <div>
      <InputField
        type="date"
        id={id}
        label={label}
        isRequired={isRequired}
        placeholder={placeholder}
        hasError={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
        }
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
      />
      <FieldError meta={field.state.meta} />
    </div>
  );
}
