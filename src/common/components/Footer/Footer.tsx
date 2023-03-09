import { getCurrentYear } from "../../../common/functions/utils";
import classes from "./Footer.module.css";

interface FooterProps {
  copyrightLabel: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightLabel }) => {
  return (
    <footer className={classes.footer}>
      <p>
        © {getCurrentYear()}.
        <a className={classes.label} href="https://bogdan-bogdanovic.com/">
          {copyrightLabel}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
