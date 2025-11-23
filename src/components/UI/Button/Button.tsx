import { cn } from "@/utils/cn";
import {
  faEdit,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, type MotionProps } from "motion/react";
import type { ComponentPropsWithRef } from "react";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariant = {
  default: "bg-blue text-white hover:opacity-80",
  outlined:
    "border-blue border-2 border-solid text-blue dark:border-sky-400 dark:bg-transparent dark:text-sky-400 hover:bg-slate-200 dark:hover:opacity-80",
  red: "bg-red text-white hover:opacity-80",
  green: "bg-green text-white hover:opacity-80",
} as const;

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  icon?: "add" | "remove" | "edit";
  variant?: keyof typeof buttonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    type = "button",
    variant = "default",
    icon,
    className,
    ...rest
  }: ButtonProps,
  ref
) {
  const buttonIcon = {
    add: faUserPlus,
    edit: faEdit,
    remove: faUserMinus,
  };

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      type={type}
      aria-label={children?.toString()}
      className={cn(
        "disabled:bg-gray flex items-center gap-2 rounded-full px-6 py-2 text-base font-medium uppercase duration-100",
        buttonVariant[variant],
        className
      )}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement> & MotionProps)}
    >
      {icon && buttonIcon[icon] && <FontAwesomeIcon icon={buttonIcon[icon]} />}
      <span className={icon ? "hidden sm:inline-block" : undefined}>
        {children}
      </span>
    </motion.button>
  );
});

export default Button;
