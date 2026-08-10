import { Link, NavLink, Outlet } from "react-router-dom";
import { MdOutlineReviews, MdOutlineSettingsApplications } from 'react-icons/md';
import { AiFillProfile } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { MdManageSearch } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    // TODO: get user role from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 bg-cyan-400 min-h-screen">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            {/* Admin */}
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                    <RiAdminFill></RiAdminFill>
                                    Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addScholarship">
                                    <IoIosAdd></IoIosAdd>
                                    Add Scholarship</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageScholarships">
                                    <MdManageSearch></MdManageSearch>
                                    Manage Scholarship</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allAppliedScholarship">
                                    <MdManageHistory></MdManageHistory>
                                    Manage Applied Application</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers">
                                    <MdManageAccounts></MdManageAccounts>
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allReviews">
                                    <MdOutlineManageAccounts></MdOutlineManageAccounts>
                                    Manage Review</NavLink>
                            </li>
                        </> : <>
                            {/* Normal user */}
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

                            {/* Moderator */}
                            <li>
                                <NavLink to="/dashboard/profile">
                                    <AiFillProfile></AiFillProfile>
                                    My Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageScholarships">
                                    <MdManageSearch></MdManageSearch>
                                    Manage Scholarships</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allReviews">
                                    <MdOutlineManageAccounts></MdOutlineManageAccounts>
                                    All Reviews</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allAppliedScholarship">
                                    <MdManageHistory></MdManageHistory>
                                    All Applied Scholarship</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addScholarship">
                                    <IoIosAdd></IoIosAdd>
                                    Add Scholarship</NavLink>
                            </li>
                        </>
                    }

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