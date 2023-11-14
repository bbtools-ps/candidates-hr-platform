import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import classes from "./ClearButton.module.css";

interface IClearButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const ClearButton: React.FC<IClearButtonProps> = ({ className, ...rest }) => {
  return (
    <motion.button
      animate={{ scale: [0.5, 1] }}
      transition={{ duration: 0.2, type: "spring" }}
      exit={{ scale: 0.5, opacity: 0 }}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement> & MotionProps)}
      className={`${classes["clear-button"]} ${className}`}
    >
      <FontAwesomeIcon icon={faTimesCircle} />
    </motion.button>
  );
};

export default ClearButton;
