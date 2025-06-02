import InputField from "@/components/UI/InputField/InputField";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface TextFieldProps {
  id?: string;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function TextField({
  id: idProp,
  label,
  isRequired,
  placeholder,
}: TextFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<string>();

  return (
    <div>
      <InputField
        type="text"
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
        onBlur={field.handleBlur}
      />
      <FieldError meta={field.state.meta} />
    </div>
  );
}
