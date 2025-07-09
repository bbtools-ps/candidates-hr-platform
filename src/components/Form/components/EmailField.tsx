import type { InputFieldProps } from "@/components/UI/InputField/InputField";
import InputField from "@/components/UI/InputField/InputField";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface EmailFieldProps
  extends Omit<
    InputFieldProps,
    "ref" | "type" | "value" | "onChange" | "onBlur"
  > {
  "data-cy"?: string;
}

export default function EmailField({
  id: idProp,
  "data-cy": dataCy,
  ...rest
}: EmailFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<string>();

  return (
    <div>
      <InputField
        type="email"
        id={id}
        hasError={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
        }
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
        onBlur={field.handleBlur}
        data-cy={dataCy}
        {...rest}
      />
      <FieldError meta={field.state.meta} data-cy={dataCy} />
    </div>
  );
}
