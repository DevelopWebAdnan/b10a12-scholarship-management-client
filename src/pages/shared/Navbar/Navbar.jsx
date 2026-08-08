import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import logo from "../../../assets/scholarship-32.png";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleLogOut = () => {
        signOutUser()
            .then(() => { })
            .catch(error => console.log(error))
    };

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/allScholarship">All Scholarship</Link></li>
        <li><Link to="/dashboard">User Dashboard</Link></li>
        {
            user ? <div className="flex items-center gap-2">
                <div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user photo"
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                        </ul>
                    </div>
                    <p>{user?.displayName}</p>
                </div>
                <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </div> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </>

    return (
        <div className="navbar fixed z-10 max-w-7xl bg-black/40 text-white shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="text-xl font-bold">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="scholarship logo" />
                        <span>Scholarship Manager</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;