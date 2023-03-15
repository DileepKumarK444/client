import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <div id="main">
        <div class="fof">
          <h1>Error 404</h1>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
      {/* <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, The requested page not found.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div> */}
    </>
  );
};

export default ErrorPage;
