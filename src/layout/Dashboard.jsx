import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineReviews, MdOutlineSettingsApplications } from 'react-icons/md';
import { FaPersonRifle } from "react-icons/fa6";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-72 bg-cyan-400 min-h-screen">
                <ul className="menu">
                    <li>
                        <NavLink to="/dashboard/myProfile">
                            <FaPersonRifle></FaPersonRifle>
                            My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myApplication">
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
            <div className="flex-1">
                <h2 className="text-3xl">Welcome to Dashboard</h2>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;