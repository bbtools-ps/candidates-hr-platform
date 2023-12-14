import { convertToKebabCase } from "@/common/utils";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IInputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  isValid?: boolean;
  error?: string;
}

export default function InputField({
  id,
  label,
  name,
  type = "text",
  className,
  isValid,
  error,
  ...rest
}: IInputFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id || convertToKebabCase(label)}>{label}</label>
      <div className="relative flex flex-col">
        <input
          id={id || convertToKebabCase(label)}
          name={name || convertToKebabCase(label)}
          type={type}
          className={`w-full flex-1 truncate rounded border-2 border-solid border-gray py-2 pl-4 pr-10 text-base duration-100 hover:border-blue dark:border-slate-600 dark:hover:border-blue ${
            label ? "" : ""
          } ${error ? "border-red bg-rose-300" : "bg-transparent"}`}
          aria-label={label}
          {...rest}
        />
        {isValid && (
          <span className="absolute right-4 flex h-full items-center text-green">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
        {error && (
          <p className="text-red dark:text-rose-400" data-cy={`invalid-${id}`}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
