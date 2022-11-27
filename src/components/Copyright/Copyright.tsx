import { getCurrentYear } from "../../functions/utils";
import styles from "./Copyright.module.css";

interface CopyrightProps {
  author: string;
}

const Copyright: React.FC<CopyrightProps> = ({ author }) => {
  return (
    <footer>
      <p className={styles["copyright-text"]}>
        © {getCurrentYear()}. <span className={styles.author}>{author}</span>
      </p>
    </footer>
  );
};

export default Copyright;
