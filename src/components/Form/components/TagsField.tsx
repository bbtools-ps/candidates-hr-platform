import type { TagsInputProps } from "@/components/UI/TagsInput/TagsInput";
import TagsInput from "@/components/UI/TagsInput/TagsInput";
import type { Tag } from "@/models";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFieldContext } from "../hooks";
import FieldError from "./FieldError";

interface TagsFieldProps
  extends Omit<TagsInputProps, "ref" | "tags" | "onAdd" | "onRemove"> {
  "data-cy"?: string;
}

export default function TagsField({
  id: idProp,
  "data-cy": dataCy,
  ...rest
}: TagsFieldProps) {
  const [id] = useState(idProp ?? uuid());
  const field = useFieldContext<Tag[]>();

  return (
    <div>
      <TagsInput
        id={id}
        hasError={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
        }
        tags={field.state.value}
        onRemove={field.removeValue}
        onAdd={(value) => {
          if (field.state.value.some((tag) => tag.value === value.value)) {
            return;
          }
          field.pushValue(value);
        }}
        data-cy={dataCy}
        {...rest}
      />
      <FieldError meta={field.state.meta} data-cy={dataCy} />
    </div>
  );
}
