import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h2 className="text-3xl">Ooppss!!</h2>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="text-red-700 font-bold">{error.statusText || error.message}</p>
            {
                error.status === 404 && <div>
                    <h3 className="text-2xl">Page Not Found</h3>
                    Go back to <Link to="/"><button>Home</button></Link>
                </div>
            }
        </div>
    );
};

export default ErrorPage;