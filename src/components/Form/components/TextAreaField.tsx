import TextAreaFieldComponent from "@/components/UI/TextAreaField/TextAreaField";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface TextAreaFieldProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  id?: string;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function TextAreaField({
  id: idProp,
  label,
  isRequired,
  placeholder,
}: TextAreaFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<string>();

  return (
    <div>
      <TextAreaFieldComponent
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
