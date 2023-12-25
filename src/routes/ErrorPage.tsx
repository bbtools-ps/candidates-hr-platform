import Button from "@/components/UI/Button/Button";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-white">
      <h1 className="flex gap-4">
        <span>
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </span>
        <span>Error</span>
      </h1>
      {isRouteErrorResponse(error) && (
        <p>
          <strong className="mr-2">{error.status}</strong>
          {error.statusText}
        </p>
      )}
      {isRouteErrorResponse(error) ? (
        <Link
          className="rounded-full bg-blue px-4 py-2 font-bold text-white duration-100 hover:opacity-80"
          to="/"
        >
          Go back home
        </Link>
      ) : (
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </Button>
      )}
    </div>
  );
};

export default ErrorPage;
