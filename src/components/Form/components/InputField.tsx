import InputFieldDefault from "@/components/UI/InputField/InputField";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface InputFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  id?: string;
  label?: string;
  isRequired?: boolean;
}

export default function InputField({
  id: idProp,
  label,
  isRequired,
  ...rest
}: InputFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<string>();

  return (
    <div>
      <InputFieldDefault
        {...rest}
        label={label}
        id={id}
        hasError={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
        }
        isRequired={isRequired}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
      />
      <FieldError meta={field.state.meta} />
    </div>
  );
}
