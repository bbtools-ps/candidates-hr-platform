import {
  faEdit,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

const buttonVariant = {
  default: "bg-blue text-white",
  outlined: "border-blue border-2 border-solid text-blue",
  red: "bg-red text-white",
  green: "bg-green text-white",
} as const;

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: "add" | "remove" | "edit";
  variant?: keyof typeof buttonVariant;
}

const Button: React.FC<IButtonProps> = ({
  children,
  type = "button",
  variant = "default",
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
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      type={type}
      aria-label={children?.toString()}
      className={`disabled:bg-gray flex items-center gap-2 rounded-full px-6 py-2 text-base font-bold uppercase duration-100 hover:opacity-80 ${buttonVariant[variant]}`}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement> & MotionProps)}
    >
      {icon && buttonIcon[icon] && <FontAwesomeIcon icon={buttonIcon[icon]} />}
      <span className={icon ? "hidden sm:inline-block" : undefined}>
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
