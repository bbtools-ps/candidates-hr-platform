import { convertToKebabCase } from "@/utils";
import { type InputHTMLAttributes } from "react";

interface IProps
  extends Omit<
    React.DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type" | "ref" | "value" | "defaultValue"
  > {
  label?: string;
}

export default function Checkbox({ label, id: idProp, ...rest }: IProps) {
  const id = idProp || convertToKebabCase(label);

  return (
    <div className="flex gap-3">
      {label && <label htmlFor={id}>{label}</label>}
      <input type="checkbox" id={id} {...rest} />
    </div>
  );
}
