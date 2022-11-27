import { getCurrentYear } from "../../functions/utils";
import classes from "./Copyright.module.css";

interface CopyrightProps {
  author: string;
}

const Copyright: React.FC<CopyrightProps> = ({ author }) => {
  return (
    <footer>
      <p className={classes["copyright-text"]}>
        © {getCurrentYear()}. <span className={classes.author}>{author}</span>
      </p>
    </footer>
  );
};

export default Copyright;
