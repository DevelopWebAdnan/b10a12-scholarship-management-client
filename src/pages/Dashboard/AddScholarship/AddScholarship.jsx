import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosOpen from "../../../hooks/useAxiosOpen";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarship = () => {
    const axiosOpen = useAxiosOpen();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isSubmitSuccessful },
        // } = useForm({defaultValues: {something: 'anything'}})
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] };
        // Source - https://stackoverflow.com/a/75516123
        // Posted by Michael M., modified by community. See post 'Timeline' for change history
        // Retrieved 2026-08-24, License - CC BY-SA 4.0

        // const dateInput = document.getElementById('date');

        const date = new Date(); // by default, today's date
        data.post_date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;

        // upload image to imgbb and get an image url
        const res = await axiosOpen.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }

            // {
            //     "name": "Global Excellence Scholarship",
            //     "university_name": "University of Melbourne",
            //     "image": {
            //         "0": {}
            //     },
            //     "country": "Australia",
            //     "city": "Melbourne",
            //     "world_rank": "13",
            //     "subject_category": "Engineering",
            //     "scholarship_category": "Full-fund",
            //     "degree": "Masters",
            //     "tution_fees": "",
            //     "application_fees": "100",
            //     "service_charge": "40",
            //     "application_deadline": "2026-10-31",
            //     "post_date": "2026-08-12",
            //     "posted_user_email": "adnanbiniqbal025@gmail.com"
            // }
        })
        if (res.data.success) {
            // send a scholarship along with an image url to the database
            const scholarship = {
                name: data.name,
                university_name: data.university_name,
                image: res.data.data.display_url,
                country: data.country,
                city: data.city,
                world_rank: data.world_rank,
                subject_category: data.subject_category,
                category: data.category,
                degree: data.degree,
                tution_fees: parseInt(data.tution_fees),
                application_fees: parseInt(data.application_fees),
                service_charge: parseInt(data.service_charge),
                deadline: data.deadline,
                post_date: data.post_date,
                posted_email: data.posted_email
            };

            const scholarshipRes = await axiosSecure.post('/scholarship', scholarship);
            console.log(scholarshipRes.data);
            if (scholarshipRes.data.insertedId) {
                // show a success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been added to the scholarship`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url ', res.data);
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            // reset({something: ""})
            reset()
        }
    }, [formState.isSubmitSuccessful, reset]
    )

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Add Scholarship</title>
            </Helmet>
            {/* <Cover title="Add Scholarship"></Cover> */}

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input {...register("something")} /> */}
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
                    <select {...register("category", { required: true })}
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
                    <label className="label" htmlFor="deadline">Application deadline *</label>
                    <input
                        {...register("deadline", { required: true })}
                        type="date"
                        id="deadline"
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
                    <label className="label" htmlFor="posted_email">Posted user email *</label>
                    <input
                        {...register("posted_email", { required: true })}
                        type="email"
                        id="posted_email"
                        className="input w-full mb-6"
                        placeholder="Posted user email" />
                </fieldset>

                <button type="submit" className="btn bg-teal-500 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Add Scholarship</button>
            </form>
        </div>
    );
};

export default AddScholarship;