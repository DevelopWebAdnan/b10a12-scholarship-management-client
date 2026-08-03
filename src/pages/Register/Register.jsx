import { Link } from "react-router-dom";
import Cover from "../shared/Cover/Cover";
import { useForm } from "react-hook-form"
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const Register = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const { createUser } = useContext(AuthContext);

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    useEffect(() => {
        if(formState.isSubmitSuccessful) {
            reset()
        }
    }, [formState.isSubmitSuccessful, reset])

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Sign Up</title>
            </Helmet>
            <Cover title="Sign Up"></Cover>
            <div className="hero bg-base-200 min-h-screen my-20">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center lg:text-left md:w-1/2">
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm">
                        <h1 className="text-3xl font-bold uppercase ml-6">Sign Up</h1>
                        <div className="divider mx-6"></div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Full Name</label>
                                <input type="text"  {...register("fullName", { required: true })} name="fullName" className="input" placeholder="Full Name *" />
                                {errors.fullName?.type === "required" && (
                                    <p className="text-red-600" role="alert">Full name is required</p>
                                )}

                                <label className="label">Phone</label>
                                <input type="number" {...register("phone")} name="phone" className="input" placeholder="Phone *" />

                                <label className="label">Email</label>
                                <input type="email"  {...register("email", { required: true })} name="email" className="input" placeholder="Email *" />
                                {errors.email?.type === "required" && (
                                    <p className="text-red-600" role="alert">Email is required</p>
                                )}

                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    {...register("password",
                                        {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*$/
                                        }
                                    )}
                                    name="password"
                                    className="input"
                                    placeholder="Password *" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600" role="alert">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600" role="alert">Password must be at least 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600" role="alert">Password must be less than 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600" role="alert">Password must contain at least one number, at least one uppercase character, at least one lowercase character, and at least one special character</p>
                                )}

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <input type="submit" className="btn bg-teal-500 text-white mt-4" value="Sign Up" />
                                {/* <input type="reset" className="btn bg-teal-500 text-white mt-4" value="Standard Reset Field Values" /> */}
                                {/* <input
                                    type="button"
                                    onClick={() => reset()}
                                    value="Custom Reset Field Values & Errors" /> */}
                                <p>Already have an account? <Link to="/login">Sign In</Link></p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;