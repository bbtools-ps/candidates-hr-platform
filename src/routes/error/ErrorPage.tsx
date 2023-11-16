import { Link } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={classes.container}>
      <h1>Error occured.</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default ErrorPage;
