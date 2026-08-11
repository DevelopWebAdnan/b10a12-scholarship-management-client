
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    // console.log('in PrivateRoute => user:', user, 'loading:', loading);

    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    if (user) {
        return children
    }

    // <Navigate to="/login" state={{ from: location }} replace></Navigate>
    return <Navigate to="/login" state={location?.pathname}></Navigate>
};

export default PrivateRoute;