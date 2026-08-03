import { Link } from "react-router-dom";
import Cover from "../shared/Cover/Cover";

const Login = () => {

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }
    return (
        <div>
            <Cover title="Sign In"></Cover>
            <div className="hero bg-base-200 min-h-screen my-20">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center lg:text-left w-full">

                        {/* <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p> */}

                    </div>
                    <div className="card w-full max-w-sm shrink-0">
                        <h1 className="text-3xl font-bold uppercase ml-6">Sign In</h1>
                        <div className="divider mx-6"></div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input type="email" name="email" className="input" placeholder="Email *"  />
                                    <label className="label">Password</label>
                                    <input type="password" name="password" className="input" placeholder="Password *" />
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <input type="submit" className="btn bg-teal-500 text-white mt-4" value="Login" />
                                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;