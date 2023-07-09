import { getCurrentYear } from "@/common/utils";
import classes from "./Footer.module.css";

interface IFooterProps {
  copyrightLabel: string;
}

const Footer: React.FC<IFooterProps> = ({ copyrightLabel }) => {
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
