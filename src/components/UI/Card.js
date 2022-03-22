import { useState, useEffect } from "react";
import styles from "./Card.module.css";

const Card = ({ className, display = "flex", children }) => {
  // change display type if window is smaller than 625px
  const [displayStyle, setDisplayStyle] = useState(
    window.innerWidth < 625 ? "grid" : display
  );

  useEffect(() => {
    const updateLayout = () => {
      window.innerWidth < 625
        ? setDisplayStyle("grid")
        : setDisplayStyle(display);
    };
    window.addEventListener("resize", updateLayout);
    updateLayout();
    return () => window.removeEventListener("resize", updateLayout);
  }, [display]);

  return (
    <div
      className={`${className ? styles.card + " " + className : styles.card}`}
      style={{ display: displayStyle }}
    >
      {children}
    </div>
  );
};

export default Card;
