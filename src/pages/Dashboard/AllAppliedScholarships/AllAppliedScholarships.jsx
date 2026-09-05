import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcCancel } from "react-icons/fc";
import { useState } from "react";
import Swal from "sweetalert2";
import FeedbackModal from "../FeedbackModal/FeedbackModal";


const AllAppliedScholarships = () => {

    const axiosSecure = useAxiosSecure();

    const [feedback, setFeedback] = useState({});

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarship-application')
            console.log(res.data);
            return res.data;
        }
    })
    console.log(applications);

    const handleFeedback = application => {
        setFeedback(application);
        console.log('application: ', application, 'feedback: ', feedback);

        const element = document.getElementById('feedback_modal');
        if (element !== null) {
            element.showModal();
        }
        else {
            console.error("Element not found");
        }
    }

    const handleDeleteItem = (application) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // const res = await axiosSecure.delete(`/scholarship-application/${application._id}`)
                const res = await axiosSecure.patch(`/scholarship-application/status/${application._id}`)
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    // refetch to update the ui
                    refetch()
                    Swal.fire({
                        title: "Cancelled!",
                        text: `Application for ${application.name} has been cancelled.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>University Name</th>
                            <th>University Address</th>
                            <th>Feedback</th>
                            <th>Subject Category</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th></th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            applications.map((application, index) => <tr key={application._id}>
                                <th>{index + 1}</th>
                                <td>{application.university_name}</td>
                                <td>{application.university_address}</td>
                                <td>{application?.feedback}</td>
                                <td>{application.subject_category}</td>
                                {/* <td>{application.degree}</td>
                                <td>{application.application_fees}</td>
                                <td>{application.service_charge}</td> */}
                                <td>{application?.status}</td>
                                <td>
                                    <button className="btn btn-ghost">

                                    </button>
                                </td>
                                <td>
                                    {/* <button className="btn" onClick={() => document.getElementById('feedback_modal').showModal()}>open modal</button> */}
                                    <button onClick={() => handleFeedback(application)} className="btn btn-soft btn-info">
                                        Feedback
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(application)} className="btn btn-ghost">
                                        <FcCancel></FcCancel>
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <FeedbackModal feedback={feedback} isLoading={isLoading} refetch={refetch}></FeedbackModal>
        </div>
    );
};

export default AllAppliedScholarships;