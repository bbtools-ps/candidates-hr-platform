import TagsInput from "@/components/UI/TagsInput/TagsInput";
import type { Tag } from "@/models";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface TagsInputFieldProps {
  id?: string;
  label?: string;
  isRequired?: boolean;
}

export default function TagsInputField({
  id: idProp,
  label,
  isRequired,
}: TagsInputFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<Tag[]>();

  return (
    <div>
      <TagsInput
        id={id}
        label={label}
        hasError={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
        }
        tags={field.state.value}
        isRequired={isRequired}
        onRemove={field.removeValue}
        onAdd={(value) => {
          if (field.state.value.some((tag) => tag.value === value.value)) {
            return;
          }
          field.pushValue(value);
        }}
      />
      <FieldError meta={field.state.meta} />
    </div>
  );
}
