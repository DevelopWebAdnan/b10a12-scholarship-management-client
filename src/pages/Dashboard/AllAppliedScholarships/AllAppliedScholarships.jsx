import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcCancel } from "react-icons/fc";
import { useState } from "react";
import Swal from "sweetalert2";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import { FaInfo } from "react-icons/fa";
import DetailsModal from "../DetailsModal/DetailsModal";


const AllAppliedScholarships = () => {

    const axiosSecure = useAxiosSecure();

    // const [scholarship, loading] = useScholarship;
    // console.log('scholarship from useScholarship():', scholarship);

    const [sort, setSort] = useState("");

    const [details, setDetails] = useState({});

    const [feedback, setFeedback] = useState({});

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ['applications', sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship-application?sort=${sort}`)
            // console.log(res.data);
            return res.data;
        }
    })
    console.log(applications);

    const handleSort = sortType => {
        setSort(sortType);

        // if(sortType === "Scholarship deadline"){
        //     const sortedApplications = [...applications].sort((a, b) => a.deadline - b.deadline);
        //     set
        // }
    }
    const handleDetails = application => {
        setDetails(application);
        console.log('application: ', application, 'details: ', details);

        // <button className="btn" onClick={()=>document.getElementById('details_modal').showModal()}>open modal</button>

        const element = document.getElementById('details_modal');
        if (element !== null) {
            element.showModal();
        }
        else {
            console.error("Element not found");
        }
    }

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

    const handleCancelItem = (application) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
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
                        text: `Application for ${application.name} has been rejected.`,
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
            {/* Sort by applied date and scholarship deadline */}
            <details className="dropdown">
                <summary className="btn m-1">
                    {
                        sort ? `Sort by: ${sort}` : 'Sort by'
                    }
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li onClick={() => handleSort("Applied date")}><a>Applied date</a></li>
                    <li onClick={() => handleSort("Scholarship deadline")}><a>Scholarship deadline</a></li>
                </ul>
            </details>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Applied date</th>
                            <th>University Name</th>
                            <th>University Address</th>
                            <th>Feedback</th>
                            <th>Subject Category</th>
                            <th>Scholarship deadline</th>
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
                                <td>{application.currentDate}</td>
                                <td>{application.university_name}</td>
                                <td>{application.university_address}</td>
                                {/* <td>{application?.feedback}</td> */}
                                <td title={application.feedback}>{application.feedback?.substring(0, 12)}...</td>
                                <td>{application.subject_category}</td>
                                {/* <td>{application.degree}</td>
                                <td>{application.application_fees}</td>
                                <td>{application.service_charge}</td> */}
                                {/* <td>{application?.status}</td> */}
                                {/* <td className=`${application.status === "Rejected" && "border-b border-red-700"}`>{application.status}</td> */}
                                {/* <td><p className=`${application.status === "Rejected" && "border-b border-red-700"}`>{application.status}</p></td> */}
                                {/* {
                                    <td className=`${application.status === "Rejected" && "border-b border-red-700"}`>{application.status}</td>
                                } */}
                                <td>{application.deadline}</td>
                                <td className={`${application.status === "Rejected" && "border-b border-red-700"}`}>{application.status}</td>
                                <td>
                                    {/* <Link to={`/scholarship/${application.scholarshipId}`}> */}
                                    <button onClick={() => handleDetails(application)} className="btn btn-ghost">
                                        <FaInfo></FaInfo>
                                    </button>
                                    {/* </Link> */}
                                </td>
                                <td>
                                    {/* <button className="btn" onClick={() => document.getElementById('feedback_modal').showModal()}>open modal</button> */}
                                    <button onClick={() => handleFeedback(application)} className="btn btn-soft btn-info">
                                        Feedback
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleCancelItem(application)} className="btn btn-ghost">
                                        <FcCancel></FcCancel>
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                details && <DetailsModal details={details} isLoading={isLoading}></DetailsModal>
            }
            <FeedbackModal feedback={feedback} isLoading={isLoading} refetch={refetch}></FeedbackModal>
        </div>
    );
};

export default AllAppliedScholarships;