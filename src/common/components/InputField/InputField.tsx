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

const InputField: React.FC<IInputFieldProps> = ({
  id,
  label,
  type = "text",
  value = "",
  className,
  isValid,
  error,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <div className="relative flex flex-col">
        <input
          {...rest}
          id={id}
          type={type}
          value={value}
          className={`border-gray flex-1 truncate rounded border-2 border-solid py-2 pl-4 pr-10 text-base duration-100 hover:border-blue focus:outline-blue ${
            label ? "" : ""
          } ${error ? "bg-rose-300 border-red" : ""}`}
          name={label}
          aria-label={label}
        />
        {isValid && (
          <span className="absolute right-4 flex h-full items-center text-green">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
        {error && (
          <p className="text-red" data-cy="invalid-phone">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
