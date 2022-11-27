import styles from "./InputField.module.css";

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  name?: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value = "",
  className,
  id,
  name,
  onChange = () => {},
  onBlur = () => {},
}) => {
  return (
    <div
      className={`${
        className
          ? styles["input-field"] + " " + className
          : styles["input-field"]
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={label ? styles["with-label"] : null}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        name={name || id}
      />
    </div>
  );
};

export default InputField;
