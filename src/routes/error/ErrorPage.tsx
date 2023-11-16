import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className={classes.container}>
      <h1>
        <span>
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </span>
        Error
      </h1>
      {isRouteErrorResponse(error) && (
        <p className={classes.details}>{`${error.status} - ${error.data}`}</p>
      )}
      <Link className={classes.link} to="/">
        Go back home
      </Link>
    </div>
  );
};

export default ErrorPage;
