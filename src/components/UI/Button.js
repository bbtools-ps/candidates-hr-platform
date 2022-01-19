import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Button.module.css";

const Button = ({
  type = "button",
  text = "button",
  icon,
  disabled = false,
  onClick = () => {},
}) => {
  if (icon) {
    return (
      <button type="button" className={styles.button} onClick={onClick}>
        {icon === "add" ? (
          <FontAwesomeIcon icon={faUserPlus} />
        ) : icon === "remove" ? (
          <FontAwesomeIcon icon={faUserMinus} />
        ) : icon === "edit" ? (
          <FontAwesomeIcon icon={faEdit} />
        ) : null}
        {text}
      </button>
    );
  } else {
    return (
      <button
        type={type}
        className={styles.button}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
};

export default Button;
