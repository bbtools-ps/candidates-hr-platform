import {
  faEdit,
  faUserMinus,
  faUserPlus,
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
  const buttonIcon = {
    add: faUserPlus,
    edit: faEdit,
    remove: faUserMinus,
  };

  return (
    <button
      type={type}
      className={classes.button}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && buttonIcon[icon] && <FontAwesomeIcon icon={buttonIcon[icon]} />}
      {text}
    </button>
  );
};

export default Button;
