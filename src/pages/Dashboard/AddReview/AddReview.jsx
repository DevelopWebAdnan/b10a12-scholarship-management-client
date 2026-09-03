import moment from "moment";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";

const AddReview = ({ addReview, isLoading, refetch }) => {
    console.log('addReview from MyApplications:', addReview);

    const { scholarshipId, university_name, applicant_email, applicant_name, photo } = addReview;
    const axiosSecure = useAxiosSecure();
    // const { user } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isSubmitSuccessful, errors },
        // } = useForm({defaultValues: {something: 'anything'}})
    } = useForm()


    const dateWrapper = moment().format('YYYY-MM-DD');
    console.log('dateWrapper:', dateWrapper);

    const onSubmit = async (data) => {
        console.log(data)
        // const imageFile = { image: data.image[0] };

        // upload image to imgbb and get an image url
        // const res = await axiosOpen.post(image_hosting_api, imageFile, {
        //     headers: {
        //         "content-type": "multipart/form-data",
        //     }
        // })
        // if (res.data.success) {
        // send a review along to the database
        const review = {
            // scholarship_name: data.scholarship_name,
            university_name: data.university_name,
            // image: res.data.data.display_url,
            // country: data.country,
            // city: data.city,
            // world_rank: data.world_rank,
            // subject_category: data.subject_category,
            // category: data.category,
            // degree: data.degree,
            // tution_fees: parseInt(data.tution_fees),
            // application_fees: parseInt(data.application_fees),
            // service_charge: parseInt(data.service_charge),
            // deadline: data.deadline,
            review_date: data.review_date,
            // posted_email: data.posted_email
            rating: parseInt(data.rating),
            comment: data.comment,
            // };

            // const scholarshipApplication = {
            reviewer_name: data.reviewer_name,
            reviewer_email: data.reviewer_email,
            // applicant_Id: data.applicant_Id,
            // scholarshipId: data.scholarshipId,
            scholarshipId,
            // currentDate: data.currentDate,
            // phone: parseInt(phone),
            // phone: data.phone || phone,
            reviewer_photo: data.reviewer_photo,
            // address: data.address || address,
            // gender: data.gender || gender,
            // degree: data.degree || degree,
            // ssc: parseFloat(data.ssc) || ssc,
            // hsc: parseFloat(data.hsc) || hsc,
            // gap: data.gap || gap,
            // status: 'pending'
        };

        const reviewRes = await axiosSecure.post('/review', review);
        // const reviewRes = await axiosSecure.patch(`/scholarship-application/${_id}`, scholarshipApplication);
        console.log(reviewRes.data);
        if (reviewRes.data.insertedId) {
            document.getElementById('add_review').close();
            refetch();
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Review for scholarship id: ${scholarshipId} has been added to the review`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        // }
        // console.log('with image url ', res.data);
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            // reset({something: ""})
            reset()
        }
    }, [formState.isSubmitSuccessful, reset]
    )

    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <Helmet>
                <title>{`Scholarship Manager | Add Review: ${scholarshipId}`}</title>
            </Helmet>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('add_review').showModal()}>open modal</button> */}
            <dialog id="add_review" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Add Review!</h3>
                    <p className="py-4">Click the button below to close</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            {/* Review comment */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Review comment</legend>
                                <textarea
                                    {...register("comment", { required: true })}
                                    className="textarea w-full mb-6"
                                    placeholder="Review comment"></textarea>
                                {/* <div className="label">Optional</div> */}
                            </fieldset>
                            {errors.comment?.type === 'required' && <p className="text-red-700">Review comment is required</p>}

                            {/* <label className="label">Phone Number *</label>
                            <input type="tel"
                                name="phone"
                                {...register("phone")}
                                defaultValue={phone}
                                className="input mb-6" placeholder="Phone Number *" /> */}

                            {/* University Name */}
                            <label className="label" htmlFor="university_name">University Name *</label>
                            <input
                                {...register("university_name", { required: true })}
                                defaultValue={university_name}
                                type="text"
                                id="university_name"
                                className="input w-full mb-6"
                                placeholder="University Name" />
                            {errors.university_name?.type === 'required' && <p className="text-red-700">University name is required</p>}

                            {/* Reviewer Name */}
                            <label className="label" htmlFor="reviewer_name">Reviewer Name *</label>
                            <input
                                {...register("reviewer_name", { required: true })}
                                // defaultValue={user?.displayName}
                                defaultValue={applicant_name}
                                type="text"
                                id="reviewer_name"
                                className="input w-full mb-6"
                                placeholder="Reviewer Name" />
                            {errors.reviewer_name?.type === 'required' && <p className="text-red-700">Reviewer name is required</p>}

                            <label className="label">Reviewer image *</label>
                            <input type="text"
                                name="reviewer_image"
                                {...register("reviewer_image", { required: true })}
                                // defaultValue={user?.photoURL}
                                defaultValue={photo}
                                className="input w-full mb-6" placeholder="Reviewer image *" />
                            {errors.reviewer_image?.type === 'required' && <p className="text-red-700">Reviewer image is required</p>}

                            {/* <label className="label">Address (village, district, country) *</label>
                            <input type="text"
                                name="address" 
                                {...register("address")}
                                defaultValue={address}
                                className="input mb-6" placeholder="Address (village, district, country) *" /> */}

                            {/* <fieldset className="fieldset">
                                <legend className="fieldset-legend">Rating point *</legend>
                                <select
                                    defaultValue={rating}
                                     name="rating"
                                    {...register("rating")}
                                    className="select">
                                    <option disabled={true}>Pick a rating point</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </fieldset> */}

                            {/* <fieldset className="fieldset my-6">
                                <legend className="fieldset-legend">Applying degree *</legend>
                                <select
                                    defaultValue={degree}
                                    name="degree"
                                    {...register("degree")}
                                    className="select">
                                    <option disabled={true}>Pick a degree</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </select>
                            </fieldset> */}

                            <label className="label">Rating point *</label>
                            <input type="number"
                                // name="rating" 
                                {...register("rating", { min: 0, max: 5, required: true })}
                                // defaultValue={rating}
                                className="input w-full mb-6" placeholder="Rating point *" />
                            {errors.rating?.type === 'required' && <p className="text-red-700">Rating point is required</p>}
                            {errors.rating?.type === 'min' && <p className="text-red-700">Rating point should be minimum 0</p>}
                            {errors.rating?.type === 'max' && <p className="text-red-700">Rating point should be maximum 5</p>}

                            {/* <label className="label">HSC Result *</label>
                            <input type="text"
                                name="hsc"
                                {...register("hsc")}
                                defaultValue={hsc}
                                className="input" placeholder="HSC Result *" /> */}

                            {/* review date */}
                            <label className="label" htmlFor="review_date">Review date *</label>
                            <input
                                {...register("review_date", { required: true })}
                                type="date"
                                defaultValue={dateWrapper}
                                id="review_date"
                                className="input w-full mb-6"
                                placeholder="Review date" />
                            {errors.date?.type === 'required' && <p className="text-red-700">Review date is required</p>}

                            {/* <fieldset className="fieldset my-6">
                                <legend className="fieldset-legend">Study gap</legend>
                                <select
                                    defaultValue={gap}
                                    name="gap"
                                    {...register("gap")}
                                    className="select">
                                    <option disabled={true}>Pick a study gap</option>
                                    <option>1 year</option>
                                    <option>2 years</option>
                                    <option>More than 2 years</option>
                                </select>
                                <span className="label">Optional</span>
                            </fieldset> */}

                            {/* reviewer email */}
                            <label className="label" htmlFor="reviewer_email">Reviewer email *</label>
                            <input
                                {...register("reviewer_email", { required: true })}
                                type="email"
                                // defaultValue={user?.email}
                                defaultValue={applicant_email}
                                id="reviewer_email"
                                className="input w-full"
                                placeholder="Reviewer email" />
                            {errors.reviewer_email?.type === 'required' && <p className="text-red-700">Reviewer email is required</p>}

                            {/* <input type="text" defaultValue={university_name} placeholder="University name" className="input" disabled />
                            <input type="text" defaultValue={category} placeholder="Scholarship category" className="input" disabled />
                            <input type="text" defaultValue={subject_category} placeholder="Subject category" className="input" disabled /> */}

                            <button className="btn bg-teal-500 text-white mt-4">Add Review</button>
                        </fieldset>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AddReview;