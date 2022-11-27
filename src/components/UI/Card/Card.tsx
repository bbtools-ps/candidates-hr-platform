import useMediaQuery from "../../../common/hooks/use-media-query";
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
  // add breakpoint for "min-width: 625px"
  const isDesktop = useMediaQuery(735);

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
