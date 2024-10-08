import { convertToKebabCase } from "@/utils";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  isValid?: boolean;
  error?: string;
}

export default function InputField({
  label,
  id: idProp,
  name: nameProp,
  type = "text",
  isValid,
  error,
  ...rest
}: IProps) {
  const id = idProp || convertToKebabCase(label);
  const name = nameProp || convertToKebabCase(label);

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="relative flex flex-col">
        <input
          id={id}
          type={type}
          className={`w-full flex-1 truncate rounded border-2 border-solid border-gray py-2 pl-4 pr-10 text-base duration-100 hover:border-blue dark:border-slate-600 dark:hover:border-sky-400 ${
            label ? "" : ""
          } ${error ? "border-red bg-rose-300" : "bg-transparent"}`}
          name={name}
          aria-label={label}
          {...rest}
        />
        {isValid && (
          <span className="absolute right-4 flex h-full items-center text-green">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
        {error && (
          <p className="text-red dark:text-rose-400" data-cy={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
