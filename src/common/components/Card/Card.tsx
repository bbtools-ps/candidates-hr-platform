import classes from "./Card.module.css";

interface ICardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<ICardProps> = ({
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={`${classes.card} ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
