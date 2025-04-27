import TagsInput from "@/components/UI/TagsInput/TagsInput";
import type { Tag } from "@/models";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface TagsFieldProps {
  id?: string;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  removeTagLabel?: string;
}

export default function TagsField({
  id: idProp,
  label,
  isRequired,
  placeholder,
  removeTagLabel,
}: TagsFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<Tag[]>();

  return (
    <div>
      <TagsInput
        id={id}
        label={label}
        placeholder={placeholder}
        removeTagLabel={removeTagLabel}
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
