import { Link, NavLink, Outlet } from "react-router-dom";
import { MdOutlineReviews, MdOutlineSettingsApplications } from 'react-icons/md';
import { AiFillProfile } from "react-icons/ai";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 bg-cyan-400 min-h-screen">
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/profile">
                            <AiFillProfile></AiFillProfile>
                            My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/application">
                            <MdOutlineSettingsApplications></MdOutlineSettingsApplications>
                            My Application</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reviews">
                            <MdOutlineReviews></MdOutlineReviews>
                            My Reviews</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1">
                <Link to="/">Home</Link>
                <h2 className="text-3xl">Welcome to Dashboard</h2>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;