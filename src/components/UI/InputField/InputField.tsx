import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./InputField.module.css";

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  name?: string;
  id: string;
  isValid?: boolean;
  checkmarkStyle?: React.CSSProperties;
  inputClass?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value = "",
  className,
  id,
  name,
  isValid,
  checkmarkStyle,
  inputClass,
  onChange = () => {},
  onBlur = () => {},
}) => {
  return (
    <div
      className={`${
        className
          ? classes["input-field"] + " " + className
          : classes["input-field"]
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`${label ? classes["with-label"] : ""} ${inputClass}`}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        name={name || id}
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
