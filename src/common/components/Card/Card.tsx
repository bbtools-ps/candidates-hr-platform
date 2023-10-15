import classes from "./Card.module.css";

interface ICardProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<ICardProps> = ({ className, style, children }) => {
  return (
    <div className={`${classes.card} ${className || ""}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
