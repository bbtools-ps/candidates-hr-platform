import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

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
      className="rounded-full text-2xl text-blue"
      aria-label="clear"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement> & MotionProps)}
    >
      <FontAwesomeIcon icon={faTimesCircle} />
    </motion.button>
  );
};

export default ClearButton;
