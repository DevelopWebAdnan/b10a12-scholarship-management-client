import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const ModeratorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    if (user && (role === 'moderator' || role === 'admin')) {
        return children
    }

    return <Navigate to="/" state={location?.pathname}></Navigate>
};

export default ModeratorRoute;