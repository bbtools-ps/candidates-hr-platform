import { Link } from "react-router-dom";
import classes from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={classes.container}>
      <h1>Page not found</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default PageNotFound;
