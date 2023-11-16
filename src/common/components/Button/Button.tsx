import {
  faEdit,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
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
    <motion.button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement> & MotionProps)}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      type={type}
      className={classes.button}
    >
      {icon && buttonIcon[icon] && <FontAwesomeIcon icon={buttonIcon[icon]} />}
      {text}
    </motion.button>
  );
};

export default Button;
