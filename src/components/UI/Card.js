import styles from "./Card.module.css";

const Card = ({ className, display = "flex", children }) => {
  return (
    <div
      className={`${className ? styles.card + " " + className : styles.card}`}
      style={{ display: display }}
    >
      {children}
    </div>
  );
};

export default Card;
