import styles from "./InputField.module.css";

const InputField = ({
  label,
  type = "text",
  placeholder,
  value = "",
  className,
  onChange = () => {},
  onBlur = () => {},
}) => {
  return (
    <label
      className={`${
        className
          ? styles["input-field"] + " " + className
          : styles["input-field"]
      }`}
    >
      {label}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={label ? styles["with-label"] : null}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  );
};

export default InputField;
