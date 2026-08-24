import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAxiosOpen from "../../../hooks/useAxiosOpen";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
export const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const UpdateScholarship = ({ scholarship }) => {
const UpdateScholarship = ({ item }) => {
    console.log('item from ManageScholarships:', item);
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

            // const scholarshipRes = await axiosSecure.post('/scholarship', scholarship);
            // const scholarshipRes = await axiosSecure.patch(`/scholarship/${_id}`, scholarship);
            // console.log(scholarshipRes.data);
            // if (scholarshipRes.data.insertedId) {
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} has been added to the scholarship`,
                showConfirmButton: false,
                timer: 1500
            });
            // }
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
                <title>Scholarship Manager | Update Scholarship</title>
                {/* <title>{`Scholarship Manager | Details: ${_id}`}</title> */}
            </Helmet>
            {/* <Cover title="Add Scholarship"></Cover> */}

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* < button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}> open modal</button > */}
            <dialog id="update_scholarship" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <input {...register("something")} /> */}
                            <fieldset className="fieldset">
                                {/* <div className="flex gap-6 my-6"> */}
                                <label className="label" htmlFor="name">Scholarship Name *</label>
                                <input
                                    {...register("name", { required: true })}
                                    defaultValue={item?.name}
                                    type="text"
                                    id="name"
                                    className="input w-full"
                                    placeholder="Scholarship Name" />
                                {/* University Name */}
                                <label className="label" htmlFor="university_name">University Name *</label>
                                <input
                                    {...register("university_name", { required: true })}
                                    defaultValue={item?.university_name}
                                    type="text"
                                    id="university_name"
                                    className="input w-full"
                                    placeholder="University Name" />
                                {/* </div> */}

                                {/* Image/Logo */}
                                {/* <label className="label" htmlFor="image">Image/logo *</label> */}
                                <input {...register("image", { required: true })}
                                    // defaultValue={item.image}
                                    type="file" className="file-input file-input-ghost w-full my-6" />
                                {/* Country */}
                                <label className="label" htmlFor="country">University Country *</label>
                                <input
                                    {...register("country", { required: true })}
                                    defaultValue={item?.country}
                                    type="text"
                                    id="country"
                                    className="input w-full mb-6"
                                    placeholder="University Country" />
                                {/* City */}
                                <label className="label" htmlFor="city">University City *</label>
                                <input
                                    {...register("city", { required: true })}
                                    defaultValue={item?.city}
                                    type="text"
                                    id="city"
                                    className="input w-full mb-6"
                                    placeholder="University City" />
                                {/* University world rank */}
                                <label className="label" htmlFor="world_rank">University world rank *</label>
                                <input
                                    {...register("world_rank", { required: true })}
                                    defaultValue={item?.world_rank}
                                    type="text"
                                    id="world_rank"
                                    className="input w-full mb-6"
                                    placeholder="University world rank" />
                                {/* Subject category */}
                                {/* <legend className="fieldset-legend">Subject category</legend> */}
                                <label className="label">Subject category *</label>
                                <select {...register("subject_category", { required: true })}
                                    defaultValue={item?.subject_category} className="select mb-6">
                                    <option disabled={true}>Pick a subject category</option>
                                    <option>Agriculture</option>
                                    <option>Engineering</option>
                                    <option>Doctor</option>
                                </select>
                                {/* Scholarship category */}
                                {/* <legend className="fieldset-legend">Scholarship category</legend> */}
                                <label className="label">Scholarship category *</label>
                                <select {...register("category", { required: true })}
                                    defaultValue={item?.category} className="select mb-6">
                                    <option disabled={true}>Pick a scholarship category</option>
                                    <option>Full-fund</option>
                                    <option>Partial</option>
                                    <option>Self-fund</option>
                                </select>
                                {/* Degree */}
                                {/* <legend className="fieldset-legend">Degree</legend> */}
                                <label className="label">Degree *</label>
                                <select {...register("degree", { required: true })}
                                    defaultValue={item?.degree} className="select mb-6">
                                    <option disabled={true}>Pick a degree</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </select>
                                {/* Tution fees */}
                                <label className="label" htmlFor="tution_fees">Tution fees</label>
                                <input
                                    {...register("tution_fees")}
                                    defaultValue={item?.tution_fees}
                                    type="number"
                                    id="tution_fees"
                                    className="input w-full"
                                    placeholder="Tution fees" />
                                <p className="label mb-6">Optional</p>
                                {/* application fees */}
                                <label className="label" htmlFor="application_fees">Application fees *</label>
                                <input
                                    {...register("application_fees", { required: true })}
                                    defaultValue={item?.application_fees}
                                    type="number"
                                    id="application_fees"
                                    className="input w-full mb-6"
                                    placeholder="Application fees" />
                                {/* service charge */}
                                <label className="label" htmlFor="service_charge">Service charge *</label>
                                <input
                                    {...register("service_charge", { required: true })}
                                    defaultValue={item?.service_charge}
                                    type="number"
                                    id="service_charge"
                                    className="input w-full mb-6"
                                    placeholder="Service charge" />
                                {/* application deadline */}
                                <label className="label" htmlFor="deadline">Application deadline *</label>
                                <input
                                    {...register("deadline", { required: true })}
                                    defaultValue={item?.deadline}
                                    type="date"
                                    id="deadline"
                                    className="input w-full mb-6"
                                    placeholder="Application deadline" />
                                {/* post date */}
                                <label className="label" htmlFor="post_date">Post date *</label>
                                <input
                                    {...register("post_date", { required: true })}
                                    defaultValue={item?.post_date}
                                    type="date"
                                    id="post_date"
                                    className="input w-full mb-6"
                                    placeholder="Post date" />
                                {/* posted user email */}
                                <label className="label" htmlFor="posted_email">Posted user email *</label>
                                <input
                                    {...register("posted_email", { required: true })}
                                    defaultValue={item?.posted_email}
                                    type="email"
                                    id="posted_email"
                                    className="input w-full mb-6"
                                    placeholder="Posted user email" />
                            </fieldset>

                            <button type="submit" className="btn bg-teal-500 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Update Scholarship</button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateScholarship;