import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./InputField.module.css";

interface IInputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  isValid?: boolean;
  checkmarkStyle?: React.CSSProperties;
  inputClass?: string;
}

const InputField: React.FC<IInputFieldProps> = ({
  label,
  type = "text",
  value = "",
  className,
  id,
  isValid,
  checkmarkStyle,
  inputClass,
  onChange,
  onBlur,
  ...rest
}) => {
  return (
    <div className={`${classes["input-field"]} ${className || ""}}`}>
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        type={type}
        value={value}
        className={`${label ? classes["with-label"] : ""} ${inputClass}`}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        name={label}
        aria-label={label}
      />
      {isValid !== undefined && isValid === true && (
        <FontAwesomeIcon
          icon={faCheck}
          className={classes.checkmark}
          style={checkmarkStyle}
        />
      )}
    </div>
  );
};

export default InputField;
