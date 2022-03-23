import useMediaQuery from "../../hooks/use-media-query";
import styles from "./Card.module.css";

const Card = ({ className, display = "flex", children }) => {
  // add breakpoint for "min-width: 625px"
  const isDesktop = useMediaQuery(625);

  return (
    <div
      className={`${className ? styles.card + " " + className : styles.card}`}
      style={{ display: isDesktop ? display : "grid" }}
    >
      {children}
    </div>
  );
};

export default Card;
