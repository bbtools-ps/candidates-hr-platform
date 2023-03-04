import useMediaQuery from "../../hooks/useMediaQuery";
import classes from "./Card.module.css";

interface CardProps {
  className?: string;
  display?: "flex" | "grid";
  children: React.ReactNode;
  styles?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  className,
  styles,
  display = "flex",
  children,
}) => {
  const isDesktop = useMediaQuery("(min-width: 735px)");

  return (
    <div
      className={`${className ? classes.card + " " + className : classes.card}`}
      style={{ ...styles, display: isDesktop ? display : "grid" }}
    >
      {children}
    </div>
  );
};

export default Card;
