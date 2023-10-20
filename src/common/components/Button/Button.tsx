import {
  faEdit,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Button.module.css";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: "add" | "remove" | "edit";
}

const Button: React.FC<IButtonProps> = ({
  type = "button",
  text = "button",
  icon,
  ...rest
}) => {
  const buttonIcon = {
    add: faUserPlus,
    edit: faEdit,
    remove: faUserMinus,
  };

  return (
    <button {...rest} type={type} className={classes.button}>
      {icon && buttonIcon[icon] && <FontAwesomeIcon icon={buttonIcon[icon]} />}
      {text}
    </button>
  );
};

export default Button;
