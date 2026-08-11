import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosOpen from "../../../hooks/useAxiosOpen";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarship = () => {
    const axiosOpen = useAxiosOpen();
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] };
        // upload image to imgbb and get an image url
        const res = await axiosOpen.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        console.log(res.data);
    }
    // const handleAddScholarship = 
    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Add Scholarship</title>
            </Helmet>
            {/* <Cover title="Add Scholarship"></Cover> */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <div className="flex gap-6 my-6">
                        <label className="label" htmlFor="name">Scholarship Name *</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            id="name"
                            className="input w-full"
                            placeholder="Scholarship Name" />
                        {/* University Name */}
                        <label className="label" htmlFor="university_name">University Name *</label>
                        <input
                            {...register("university_name", { required: true })}
                            type="text"
                            id="university_name"
                            className="input w-full"
                            placeholder="University Name" />
                    </div>

                    {/* Image/Logo */}
                    {/* <label className="label" htmlFor="image">Image/logo *</label> */}
                    <input {...register("image", { required: true })}
                        type="file" className="file-input file-input-ghost w-full my-6" />
                    {/* Country */}
                    <label className="label" htmlFor="country">University Country *</label>
                    <input
                        {...register("country", { required: true })}
                        type="text"
                        id="country"
                        className="input w-full mb-6"
                        placeholder="University Country" />
                    {/* City */}
                    <label className="label" htmlFor="city">University City *</label>
                    <input
                        {...register("city", { required: true })}
                        type="text"
                        id="city"
                        className="input w-full mb-6"
                        placeholder="University City" />
                    {/* University world rank */}
                    <label className="label" htmlFor="world_rank">University world rank *</label>
                    <input
                        {...register("world_rank", { required: true })}
                        type="text"
                        id="world_rank"
                        className="input w-full mb-6"
                        placeholder="University world rank" />
                    {/* Subject category */}
                    {/* <legend className="fieldset-legend">Subject category</legend> */}
                    <label className="label">Subject category *</label>
                    <select {...register("subject_category", { required: true })}
                        defaultValue="Pick a subject category" className="select mb-6">
                        <option disabled={true}>Pick a subject category</option>
                        <option>Agriculture</option>
                        <option>Engineering</option>
                        <option>Doctor</option>
                    </select>
                    {/* Scholarship category */}
                    {/* <legend className="fieldset-legend">Scholarship category</legend> */}
                    <label className="label">Scholarship category *</label>
                    <select {...register("scholarship_category", { required: true })}
                        defaultValue="Pick a scholarship category" className="select mb-6">
                        <option disabled={true}>Pick a scholarship category</option>
                        <option>Full-fund</option>
                        <option>Partial</option>
                        <option>Self-fund</option>
                    </select>
                    {/* Degree */}
                    {/* <legend className="fieldset-legend">Degree</legend> */}
                    <label className="label">Degree *</label>
                    <select {...register("degree", { required: true })}
                        defaultValue="Pick a degree" className="select mb-6">
                        <option disabled={true}>Pick a degree</option>
                        <option>Diploma</option>
                        <option>Bachelor</option>
                        <option>Masters</option>
                    </select>
                    {/* Tution fees */}
                    <label className="label" htmlFor="tution_fees">Tution fees</label>
                    <input
                        {...register("tution_fees")}
                        type="number"
                        id="tution_fees"
                        className="input w-full"
                        placeholder="Tution fees" />
                    <p className="label mb-6">Optional</p>
                    {/* application fees */}
                    <label className="label" htmlFor="application_fees">Application fees *</label>
                    <input
                        {...register("application_fees", { required: true })}
                        type="number"
                        id="application_fees"
                        className="input w-full mb-6"
                        placeholder="Application fees" />
                    {/* service charge */}
                    <label className="label" htmlFor="service_charge">Service charge *</label>
                    <input
                        {...register("service_charge", { required: true })}
                        type="number"
                        id="service_charge"
                        className="input w-full mb-6"
                        placeholder="Service charge" />
                    {/* application deadline */}
                    <label className="label" htmlFor="application_deadline">Application deadline *</label>
                    <input
                        {...register("application_deadline", { required: true })}
                        type="date"
                        id="application_deadline"
                        className="input w-full mb-6"
                        placeholder="Application deadline" />
                    {/* post date */}
                    <label className="label" htmlFor="post_date">Post date *</label>
                    <input
                        {...register("post_date", { required: true })}
                        type="date"
                        id="post_date"
                        className="input w-full mb-6"
                        placeholder="Post date" />
                    {/* posted user email */}
                    <label className="label" htmlFor="post_date">Posted user email *</label>
                    <input
                        {...register("posted_user_email", { required: true })}
                        type="email"
                        id="posted_user_email"
                        className="input w-full mb-6"
                        placeholder="Posted user email" />
                </fieldset>

                <button type="submit" className="btn bg-teal-500 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Add Scholarship</button>
            </form>
        </div>
    );
};

export default AddScholarship;