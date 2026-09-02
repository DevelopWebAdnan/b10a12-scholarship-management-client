import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateApplication from "../UpdateApplication/UpdateApplication";


const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [updateApplication, setUpdateApplication] = useState({});

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'applications'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship-application?email=${user.email}`)
            console.log(res.data);
            return res.data;
        }
    })
    console.log(applications);

    const handleUpdateApplication = application => {
        setUpdateApplication(application);
        console.log('application: ', application, 'updateApplication: ', updateApplication);

        const element = document.getElementById('update_application');
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
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // const res = await axiosSecure.delete(`/scholarship/${item._id}`)
                const res = await axiosSecure.delete(`/scholarship-application/${application._id}`)
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `Application for ${application.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }
    return (
        <div>
            <h2 className="text-3xl">My Applications: {applications.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>University Name</th>
                            <th>University Address</th>
                            <th>Feedback</th>
                            <th>Subject Category</th>
                            <th>Applied Degree</th>
                            <th>Application Fees</th>
                            <th>Service Charge</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>Edit</th>
                            <th>Cancel</th>
                            <th></th>
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
                                <td>{application.degree}</td>
                                <td>{application.application_fees}</td>
                                <td>{application.service_charge}</td>
                                <td>{application?.status}</td>
                                <td>
                                    <button className="btn btn-ghost">

                                    </button>
                                </td>
                                <td>
                                    {/* <Link to={`/dashboard/updateScholarship/${item._id}`}> */}
                                    {/* <button className="btn" onClick={() => document.getElementById('update_application').showModal()}>update_application modal</button> */}

                                    < button className="btn" onClick={() => handleUpdateApplication(application)}>
                                        <FaEdit></FaEdit>
                                    </button >
                                    {/* </Link> */}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(application)} className="btn btn-ghost">
                                        <FcCancel></FcCancel>
                                    </button>
                                </td>
                                <td><button className="btn btn-soft btn-info">Add Review</button></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <UpdateApplication updateApplication={updateApplication} isLoading={isLoading} refetch={refetch}></UpdateApplication>
        </div>
    );
};

export default MyApplications;