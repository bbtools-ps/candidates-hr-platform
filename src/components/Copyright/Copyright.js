import styles from "./Copyright.module.css";

const getCurrentDate = () => {
  const date = new Date();
  return date.getFullYear();
};

const Copyright = ({ author }) => {
  return (
    <footer>
      <p className={styles["copyright-text"]}>
        © {getCurrentDate()}. <span className={styles.author}>{author}</span>
      </p>
    </footer>
  );
};

export default Copyright;
