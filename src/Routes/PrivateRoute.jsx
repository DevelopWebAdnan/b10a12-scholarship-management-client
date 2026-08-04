import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    if (user) {
        return children
    }

    <Navigate to="/login" state={{ from: location?.pathname }} replace></Navigate>
};

export default PrivateRoute;