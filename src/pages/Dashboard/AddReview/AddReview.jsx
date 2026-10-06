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

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isSubmitSuccessful, errors },
    } = useForm()


    const dateWrapper = moment().format('YYYY-MM-DD');
    // console.log('dateWrapper:', dateWrapper);

    const onSubmit = async (data) => {
        console.log(data)

        const review = {
            university_name: data.university_name || university_name,
            review_date: data.review_date,
            rating: parseInt(data.rating),
            comment: data.comment,
            reviewer_name: data.reviewer_name || applicant_name,
            reviewer_email: data.reviewer_email || applicant_email,
            scholarshipId,
            reviewer_image: data.reviewer_image || photo,
        };

        const reviewRes = await axiosSecure.post('/review', review);
        console.log(reviewRes.data);
        if (reviewRes.data.insertedId) {
            document.getElementById('add_review').close();
            refetch();
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Review for ${university_name} has been added`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
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
                            </fieldset>
                            {errors.comment?.type === 'required' && <p className="text-red-700">Review comment is required</p>}

                            {/* University Name */}
                            <label className="label" htmlFor="university_name">University Name *</label>
                            <input
                                {...register("university_name")}
                                defaultValue={university_name}
                                type="text"
                                disabled
                                id="university_name"
                                className="input w-full mb-6"
                                placeholder="University Name" />

                            {/* Reviewer Name */}
                            <label className="label" htmlFor="reviewer_name">Reviewer Name *</label>
                            <input
                                {...register("reviewer_name")}
                                defaultValue={applicant_name}
                                disabled
                                type="text"
                                id="reviewer_name"
                                className="input w-full mb-6"
                                placeholder="Reviewer Name" />

                            <label className="label">Reviewer image *</label>
                            <input type="text"
                                name="reviewer_image"
                                {...register("reviewer_image")}
                                defaultValue={photo}
                                disabled
                                className="input w-full mb-6" placeholder="Reviewer image *" />

                            <label className="label">Rating point *</label>
                            <input type="number"
                                {...register("rating", { min: 0, max: 5, required: true })}
                                className="input w-full mb-6" placeholder="Rating point *" />
                            {errors.rating?.type === 'required' && <p className="text-red-700">Rating point is required</p>}
                            {errors.rating?.type === 'min' && <p className="text-red-700">Rating point should be minimum 0</p>}
                            {errors.rating?.type === 'max' && <p className="text-red-700">Rating point should be maximum 5</p>}

                            {/* review date */}
                            <label className="label" htmlFor="review_date">Review date *</label>
                            <input
                                {...register("review_date")}
                                type="date"
                                defaultValue={dateWrapper}
                                disabled
                                id="review_date"
                                className="input w-full mb-6"
                                placeholder="Review date" />

                            {/* reviewer email */}
                            <label className="label" htmlFor="reviewer_email">Reviewer email *</label>
                            <input
                                {...register("reviewer_email")}
                                type="email"
                                defaultValue={applicant_email}
                                disabled
                                id="reviewer_email"
                                className="input w-full"
                                placeholder="Reviewer email" />

                            <button className="btn bg-cyan-500 text-white mt-4">Add Review</button>
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