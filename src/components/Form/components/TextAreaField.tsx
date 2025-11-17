import type { TextAreaProps } from "@/components/UI/TextArea/TextArea";
import TextArea from "@/components/UI/TextArea/TextArea";
import { useId } from "react";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface TextAreaFieldProps
  extends Omit<TextAreaProps, "ref" | "value" | "onChange" | "onBlur" | "id"> {
  "data-cy"?: string;
}

export default function TextAreaField({
  "data-cy": dataCy,
  ...rest
}: TextAreaFieldProps) {
  const id = useId();
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
