import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosOpen from "../../../hooks/useAxiosOpen";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const UpdateScholarship = ({ scholarship }) => {
const UpdateScholarship = ({ item }) => {
    console.log('item from ManageScholarships:', item);

    const { _id, name, university_name, subject_category, image, country, city, world_rank, deadline, tution_fees, application_fees, category, degree, subject_name, description, stipend, post_date, service_charge, posted_email } = item;
    console.log('post_date:', post_date, 'category:', category, 'degree:', degree, 'image:', image, 'subject_name: ', subject_name, 'description:', description, 'stipend:', stipend);

    const axiosOpen = useAxiosOpen();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        // reset,
        // formState,
        // formState: { isSubmitSuccessful },
        // } = useForm({defaultValues: {something: 'anything'}})
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)

        const scholarship = {
            name: data.name || name,
            university_name: data.university_name || university_name,
            // image: res.data.data.display_url,
            // image: image,
            country: data.country || country,
            city: data.city || city,
            world_rank: data.world_rank || world_rank,
            subject_category: data.subject_category || subject_category,
            category: data.category || category,
            degree: data.degree || category,
            tution_fees: parseInt(data.tution_fees) || tution_fees,
            application_fees: parseInt(data.application_fees) || application_fees,
            service_charge: parseInt(data.service_charge) || service_charge,
            deadline: data.deadline || deadline,
            subject_name: data.subject_name || subject_name,
            description: data.description || description,
            stipend: parseInt(data.stipend) || stipend,
            post_date: data.post_date || post_date,
            posted_email: data.posted_email || posted_email
        };

        if (data.image[0]) {
            const imageFile = { image: data.image[0] };
            // upload image to imgbb and get an image url
            const res = await axiosOpen.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                }
            })
            if (res.data.success) {
                // send a scholarship along with an image url to the database
                const scholarshipWithImageFile = {
                    ...scholarship, image: res.data.data.display_url,
                };

                // const scholarshipRes = await axiosSecure.post('/scholarship', scholarship);
                const scholarshipRes = await axiosSecure.patch(`/scholarship/${_id}`, scholarshipWithImageFile);

                console.log(scholarshipRes.data);
                if (scholarshipRes.data.modifiedCount > 0) {
                    // element.close();
                    document.getElementById('update_scholarship').close();
                    // show a success popup
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} has been updated to the scholarship`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log('with image url ', res.data);
            }
        } else {
            const scholarshipWithoutImageFile = {
                ...scholarship, image: image,
            }

            const scholarshipRes = await axiosSecure.patch(`/scholarship/${_id}`, scholarshipWithoutImageFile);
            console.log(scholarshipRes.data);
            if (scholarshipRes.data.modifiedCount > 0) {
                // element.close();
                document.getElementById('update_scholarship').close();
                // show a success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated to the scholarship`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    // useEffect(() => {
    //     if (formState.isSubmitSuccessful) {
    //         // reset({something: ""})
    //         reset()
    //     }
    // }, [formState.isSubmitSuccessful, reset]
    // )

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Update Scholarship</title>
                {/* <title>{`Scholarship Manager | Details: ${_id}`}</title> */}
            </Helmet>

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
                                    {...register("name")}
                                    defaultValue={name}
                                    type="text"
                                    id="name"
                                    className="input w-full"
                                    placeholder="Scholarship Name" />
                                {/* University Name */}
                                <label className="label" htmlFor="university_name">University Name *</label>
                                <input
                                    {...register("university_name")}
                                    defaultValue={university_name}
                                    type="text"
                                    id="university_name"
                                    className="input w-full"
                                    placeholder="University Name" />
                                {/* </div> */}

                                {/* Image/Logo */}
                                {/* <label className="label" htmlFor="image">Image/logo *</label> */}
                                <input {...register("image")}
                                    // defaultValue={image}
                                    type="file" className="file-input file-input-ghost w-full my-6" />
                                {/* Country */}
                                <label className="label" htmlFor="country">University Country *</label>
                                <input
                                    {...register("country")}
                                    defaultValue={country}
                                    type="text"
                                    id="country"
                                    className="input w-full mb-6"
                                    placeholder="University Country" />
                                {/* City */}
                                <label className="label" htmlFor="city">University City *</label>
                                <input
                                    {...register("city")}
                                    defaultValue={city}
                                    type="text"
                                    id="city"
                                    className="input w-full mb-6"
                                    placeholder="University City" />
                                {/* University world rank */}
                                <label className="label" htmlFor="world_rank">University world rank *</label>
                                <input
                                    {...register("world_rank")}
                                    defaultValue={world_rank}
                                    type="text"
                                    id="world_rank"
                                    className="input w-full mb-6"
                                    placeholder="University world rank" />
                                {/* Subject category */}
                                {/* <legend className="fieldset-legend">Subject category</legend> */}
                                <label className="label">Subject category *</label>
                                <select {...register("subject_category")}
                                    defaultValue={subject_category} className="select mb-6">
                                    <option disabled={true}>Pick a subject category</option>
                                    <option>Agriculture</option>
                                    <option>Engineering</option>
                                    <option>Doctor</option>
                                </select>
                                {/* Scholarship category */}
                                {/* <legend className="fieldset-legend">Scholarship category</legend> */}
                                <label className="label">Scholarship category *</label>
                                <select {...register("category")}
                                    defaultValue={category} className="select mb-6">
                                    <option disabled={true}>Pick a scholarship category</option>
                                    <option>Full-fund</option>
                                    <option>Partial</option>
                                    <option>Self-fund</option>
                                </select>
                                {/* Degree */}
                                {/* <legend className="fieldset-legend">Degree</legend> */}
                                <label className="label">Degree *</label>
                                <select {...register("degree")}
                                    defaultValue={degree} className="select mb-6">
                                    <option disabled={true}>Pick a degree</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </select>
                                {/* Tution fees */}
                                <label className="label" htmlFor="tution_fees">Tution fees</label>
                                <input
                                    {...register("tution_fees")}
                                    defaultValue={tution_fees}
                                    type="number"
                                    id="tution_fees"
                                    className="input w-full"
                                    placeholder="Tution fees" />
                                <p className="label mb-6">Optional</p>
                                {/* application fees */}
                                <label className="label" htmlFor="application_fees">Application fees *</label>
                                <input
                                    {...register("application_fees")}
                                    defaultValue={application_fees}
                                    type="number"
                                    id="application_fees"
                                    className="input w-full mb-6"
                                    placeholder="Application fees" />
                                {/* service charge */}
                                <label className="label" htmlFor="service_charge">Service charge *</label>
                                <input
                                    {...register("service_charge")}
                                    defaultValue={service_charge}
                                    type="number"
                                    id="service_charge"
                                    className="input w-full mb-6"
                                    placeholder="Service charge" />
                                {/* application deadline */}
                                <label className="label" htmlFor="deadline">Application deadline *</label>
                                <input
                                    {...register("deadline")}
                                    defaultValue={deadline}
                                    type="date"
                                    id="deadline"
                                    className="input w-full mb-6"
                                    placeholder="Application deadline" />
                                {/* Subject Name */}
                                <label className="label" htmlFor="subject_name">Subject Name *</label>
                                <input
                                    {...register("subject_name")}
                                    defaultValue={subject_name}
                                    type="text"
                                    id="subject_name"
                                    className="input w-full mb-6"
                                    placeholder="Subject Name" />
                                {/* Scholarship Description */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Scholarship description</legend>
                                    <textarea
                                        {...register("description")}
                                        defaultValue={description}
                                        className="textarea h-24 w-full mb-6"
                                        placeholder="Scholarship description"></textarea>
                                    {/* <div className="label">Optional</div> */}
                                </fieldset>
                                {/* Stipend */}
                                <label className="label" htmlFor="stipend">Stipend</label>
                                <input
                                    {...register("stipend")}
                                    defaultValue={stipend}
                                    type="number"
                                    id="stipend"
                                    className="input w-full"
                                    placeholder="Stipend" />
                                <p className="label mb-6">(if have)</p>
                                {/* post date */}
                                <label className="label" htmlFor="post_date">Post date *</label>
                                <input
                                    {...register("post_date")}
                                    defaultValue={post_date}
                                    type="date"
                                    id="post_date"
                                    className="input w-full mb-6"
                                    placeholder="Post date" />
                                {/* posted user email */}
                                <label className="label" htmlFor="posted_email">Posted user email *</label>
                                <input
                                    {...register("posted_email")}
                                    defaultValue={posted_email}
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