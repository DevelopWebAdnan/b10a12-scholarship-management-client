import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EditReview = ({ editReview, isLoading, refetch }) => {
    console.log('editReview from Reviews:', editReview);
    const { _id, scholarship_name, comment, rating, review_date, reviewer_email, reviewer_image, reviewer_name, university_name, scholarshipId } = editReview;
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        // reset,
        // formState,
        formState: { errors },
        // } = useForm({defaultValues: {something: 'anything'}})
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const review = {
            university_name: data.university_name || university_name,
            review_date: data.review_date || review_date,
            rating: parseInt(data.rating) || rating,
            comment: data.comment || comment,
            reviewer_name: data.reviewer_name || reviewer_name,
            reviewer_email: data.reviewer_email || reviewer_email,
            scholarshipId,
            reviewer_image: data.reviewer_image || reviewer_image,
        }

        const reviewRes = await axiosSecure.patch(`/review/${_id}`, review);
        console.log(reviewRes.data);
        if (reviewRes.data.modifiedCount > 0) {
            document.getElementById('edit_review').close();
            refetch();
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Review for ${scholarship_name} has been edited.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }
    return (
        <div>
            <Helmet>
                <title>{`Scholarship Manager | Edit Review: ${scholarship_name}`}</title>
            </Helmet>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('edit_review').showModal()}>open modal</button> */}
            <dialog id="edit_review" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Review!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            {/* Review comment */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Review comment</legend>
                                <textarea
                                    {...register("comment")}
                                    defaultValue={comment}
                                    className="textarea w-full mb-6"
                                    placeholder="Review comment"></textarea>
                                {/* <div className="label">Optional</div> */}
                            </fieldset>
                            {errors.comment?.type === 'required' && <p className="text-red-700">Review comment is required</p>}

                            {/* University Name */}
                            <label className="label" htmlFor="university_name">University Name *</label>
                            <input
                                {...register("university_name")}
                                defaultValue={university_name}
                                type="text"
                                id="university_name"
                                className="input w-full mb-6"
                                placeholder="University Name" />
                            {/* {errors.university_name?.type === 'required' && <p className="text-red-700">University name is required</p>} */}

                            {/* Reviewer Name */}
                            <label className="label" htmlFor="reviewer_name">Reviewer Name *</label>
                            <input
                                {...register("reviewer_name")}
                                // defaultValue={user?.displayName}
                                defaultValue={reviewer_name}
                                type="text"
                                id="reviewer_name"
                                className="input w-full mb-6"
                                placeholder="Reviewer Name" />
                            {/* {errors.reviewer_name?.type === 'required' && <p className="text-red-700">Reviewer name is required</p>} */}

                            <label className="label">Reviewer image *</label>
                            <input type="text"
                                name="reviewer_image"
                                {...register("reviewer_image")}
                                // defaultValue={user?.photoURL}
                                defaultValue={reviewer_image}
                                className="input w-full mb-6" placeholder="Reviewer image *" />
                            {/* {errors.reviewer_image?.type === 'required' && <p className="text-red-700">Reviewer image is required</p>} */}

                            <label className="label">Rating point *</label>
                            <input type="number"
                                {...register("rating", { min: 0, max: 5 })}
                                defaultValue={rating}
                                className="input w-full mb-6" placeholder="Rating point *" />
                            {/* {errors.rating?.type === 'required' && <p className="text-red-700">Rating point is required</p>} */}
                            {errors.rating?.type === 'min' && <p className="text-red-700">Rating point should be minimum 0</p>}
                            {errors.rating?.type === 'max' && <p className="text-red-700">Rating point should be maximum 5</p>}

                            {/* review date */}
                            <label className="label" htmlFor="review_date">Review date *</label>
                            <input
                                {...register("review_date")}
                                type="date"
                                defaultValue={review_date}
                                id="review_date"
                                className="input w-full mb-6"
                                placeholder="Review date" />
                            {/* {errors.date?.type === 'required' && <p className="text-red-700">Review date is required</p>} */}

                            {/* reviewer email */}
                            <label className="label" htmlFor="reviewer_email">Reviewer email *</label>
                            <input
                                {...register("reviewer_email")}
                                type="email"
                                // defaultValue={user?.email}
                                defaultValue={reviewer_email}
                                id="reviewer_email"
                                className="input w-full"
                                placeholder="Reviewer email" />
                            {/* {errors.reviewer_email?.type === 'required' && <p className="text-red-700">Reviewer email is required</p>} */}
                            <button className="btn bg-teal-500 text-white mt-4">Edit Review</button>
                        </fieldset>
                    </form>

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

export default EditReview;