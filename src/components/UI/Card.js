import styles from "./Card.module.css";

const Card = ({ className, display = "flex", children }) => {
  // change display type if window size for smaller screens
  const windowWidth = window.innerWidth;
  return (
    <div
      className={`${className ? styles.card + " " + className : styles.card}`}
      style={windowWidth <= 625 ? { display: "grid" } : { display: display }}
    >
      {children}
    </div>
  );
};

export default Card;
