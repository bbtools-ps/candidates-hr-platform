import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ClearButton.module.css";

interface IClearButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const ClearButton: React.FC<IClearButtonProps> = ({ className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${classes["clear-button"]} ${className}`}
      aria-label="Clear"
    >
      <FontAwesomeIcon icon={faTimesCircle} />
    </button>
  );
};

export default ClearButton;
