import { getCurrentYear } from "../../../common/functions/utils";
import classes from "./Footer.module.css";

interface FooterProps {
  copyrightLabel: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightLabel }) => {
  return (
    <footer>
      <p className={classes["copyright-text"]}>
        © {getCurrentYear()}.
        <span className={classes.label}>{copyrightLabel}</span>
      </p>
    </footer>
  );
};

export default Footer;
