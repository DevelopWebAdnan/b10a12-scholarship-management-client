import { Link } from "react-router-dom";
import Cover from "../shared/Cover/Cover";
import { useForm } from "react-hook-form"

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <div>
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
                                {errors.fullName && <span className="text-red-600">Full Name is required</span>}

                                <label className="label">Phone</label>
                                <input type="number" {...register("phone")} name="phone" className="input" placeholder="Phone *" />

                                <label className="label">Email</label>
                                <input type="email"  {...register("email", { required: true })} name="email" className="input" placeholder="Email *" />
                                {errors.email && <span className="text-red-600">Email is required</span>}

                                <label className="label">Password</label>
                                <input type="password"  {...register("password", { required: true, minLength:6, maxLength: 20 })} name="password" className="input" placeholder="Password *" />
                                {errors.password && <span className="text-red-600">Password is required</span>}

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <input type="submit" className="btn bg-teal-500 text-white mt-4" value="Sign Up" />
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