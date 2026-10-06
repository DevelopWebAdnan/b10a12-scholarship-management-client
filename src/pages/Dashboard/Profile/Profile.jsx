import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";


const Profile = () => {
    const { user } = useAuth();
    const [role, isLoading] = useRole();

    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Profile</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        alt="User image"
                        src={user?.photoURL}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{user?.displayName}</h2>
                        {
                            role !== "user" && <p className="py-6">Role: {role}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;