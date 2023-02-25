import {
  faEdit,
  faUserMinus,
  faUserPlus,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: "add" | "remove" | "edit";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text = "button",
  icon,
  disabled = false,
  onClick = () => {},
}) => {
  let buttonIcon: IconDefinition | null = null;

  switch (icon) {
    case "add":
      buttonIcon = faUserPlus;
      break;
    case "edit":
      buttonIcon = faEdit;
      break;
    case "remove":
      buttonIcon = faUserMinus;
      break;
    default:
      break;
  }

  return (
    <button
      type={type}
      className={classes.button}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && buttonIcon && <FontAwesomeIcon icon={buttonIcon} />}
      {text}
    </button>
  );
};

export default Button;
