import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";

const FeedbackModal = ({ feedback, isLoading, refetch }) => {
    console.log('feedback from MyApplications:', feedback);

    const { _id, scholarshipId, university_name } = feedback;

    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isSubmitSuccessful, errors },
        // } = useForm({defaultValues: {something: 'anything'}})
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data);

        const feedback = {
            feedback: data.feedback
        }
        // const feedback = {
        //     data
        // }
        // const feedback = data.feedback


        // const feedbackRes = await axiosSecure.post('/feedback', feedback);
        const feedbackRes = await axiosSecure.patch(`/scholarship-application/feedback/${_id}`, feedback );
        console.log(feedbackRes.data);
        if (feedbackRes.data.modifiedCount > 0) {
            document.getElementById('feedback_modal').close();
            refetch();
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Feedback for ${university_name} has been added`,
                showConfirmButton: false,
                timer: 1500
            });
        }
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
                <title>{`Scholarship Manager | Add Feedback: ${scholarshipId}`}</title>
            </Helmet>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* < button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}> open modal</button > */}
            <dialog id="feedback_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Feedback!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Add Feedback</legend>
                            <textarea
                                {...register("feedback", { required: true })}
                                className="textarea w-full"
                                placeholder="Add Feedback"></textarea>
                            {/* <div className="label">Optional</div> */}
                        </fieldset>
                        {errors.comment?.type === 'required' && <p className="text-red-700">Feedback is required</p>}

                        <button className="btn bg-cyan-400 text-white mt-4">Add Feedback</button>
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

export default FeedbackModal;