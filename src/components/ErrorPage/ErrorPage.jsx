import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="text-center my-6">
            <h2 className="text-3xl">Ooppss!!</h2>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="text-red-700 font-bold text-xl my-4">{error.statusText || error.message}</p>
            {
                error.status === 404 && <div>
                    <h3 className="text-lg">Page Not Found</h3>
                    Go back to <Link to="/"><button className="btn bg-teal-500 text-white">Home</button></Link>
                </div>
            }
        </div>
    );
};

export default ErrorPage;