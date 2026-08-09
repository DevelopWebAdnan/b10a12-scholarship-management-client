import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    console.log('in PrivateRoute => user:', user, 'loading:', loading);

    const location = useLocation();
    console.log(location);

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