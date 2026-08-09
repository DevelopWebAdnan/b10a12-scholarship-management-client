import { Link, useLocation, useNavigate } from "react-router-dom";
import Cover from "../shared/Cover/Cover";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import img from "../../assets/assignment-12/10022.jpg";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {

    const { signInUser } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    console.log("Location state at Login page:", location.state);
    // const from = location.state?.from?.pathname || '/';
    const from = location.state || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // reset error
        setErrorMessage("");

        signInUser(email, password)
            .then(result => {
                console.log('Signed in user:', result.user);
                navigate(from);
            })
            .catch(error => {
                console.log('Sign in error:', error.message);
                setErrorMessage(error.message);
            })
    }

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Sign In</title>
            </Helmet>
            <Cover title="Sign In"></Cover>
            <div className="hero bg-base-200 min-h-screen my-20">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center lg:text-left md:w-1/2">
                        <img src={img} className="w-full" alt="image" />
                    </div>
                    <div className="card md:w-1/2 max-w-sm">
                        <h1 className="text-3xl font-bold uppercase ml-6">Sign In</h1>
                        <div className="divider mx-6"></div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input type="email" name="email" className="input" placeholder="Email *" />
                                    <label className="label">Password</label>
                                    <input type="password" name="password" className="input" placeholder="Password *" />
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <input type="submit" className="btn bg-teal-500 text-white mt-4" value="Login" />
                                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                                </fieldset>

                                {
                                    errorMessage && <p className="text-red-600">{errorMessage}</p>
                                }
                            </form>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;