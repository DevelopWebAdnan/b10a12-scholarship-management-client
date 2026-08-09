import { Link, useNavigate } from "react-router-dom";
import Cover from "../shared/Cover/Cover";
import { useForm } from "react-hook-form"
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import signUpImage from "../../assets/assignment-12/10022.jpg";
import useAxiosOpen from "../../hooks/useAxiosOpen";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosOpen = useAxiosOpen();

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                console.log('Registered user:', result.user);
                updateUserProfile(data.fullName, data.photoURL)
                    .then(() => {
                        // console.log('User profile info has been updated')
                        // send user info to the database
                        const userInfo = {
                            userName: data.fullName,
                            userEmail: data.email,
                            role: 'user',
                        }

                        axiosOpen.post('http://localhost:5000/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('A user has been created in the database');
                                }
                            })

                        navigate('/')
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                console.log('Registration error:', error.message);
            });
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
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
                        <img src={signUpImage} alt="sign up image" />
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

                                <label className="label">Photo URL</label>
                                <input type="text" {...register("photoURL", { required: true })} name="photoURL" className="input" placeholder="Photo URL *" />
                                {errors.photoURL?.type === "required" && (
                                    <p className="text-red-600" role="alert">Photo URL is required</p>
                                )}

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
                                            // maxLength: 20,
                                            pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/
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
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600" role="alert">Password must contain at least one capital letter, and at least one special character</p>
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
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;