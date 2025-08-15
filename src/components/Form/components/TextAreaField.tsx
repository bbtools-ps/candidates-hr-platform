import type { TextAreaProps } from "@/components/UI/TextArea/TextArea";
import TextArea from "@/components/UI/TextArea/TextArea";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface TextAreaFieldProps
  extends Omit<TextAreaProps, "ref" | "value" | "onChange" | "onBlur"> {
  "data-cy"?: string;
}

export default function TextAreaField({
  id: idProp,
  "data-cy": dataCy,
  ...rest
}: TextAreaFieldProps) {
  const [id] = useState(() => idProp ?? uuid());
  const field = useFieldContext<string>();

  return (
    <div>
      <TextArea
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
