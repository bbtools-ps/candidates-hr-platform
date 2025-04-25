import { convertToKebabCase } from "@/utils";
import type { ComponentPropsWithoutRef } from "react";

interface CheckboxProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "value" | "defaultValue"
  > {
  label?: string;
}

export default function Checkbox({
  label,
  id: idProp,
  ...rest
}: CheckboxProps) {
  const id = idProp || convertToKebabCase(label);

  return (
    <div className="flex gap-3">
      <input type="checkbox" id={id} {...rest} />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}
