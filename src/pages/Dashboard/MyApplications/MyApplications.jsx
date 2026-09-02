import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";


const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const [uploadApplication, setUploadApplication] = useState({});

    const { data: applications = [], refetch } = useQuery({
        queryKey: [user?.email, 'application'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship-application?email=${user.email}`)
            // console.log(res.data);
            return res.data;
        }
    })
    console.log(applications);

    // const handleUpdateApplication = application => {
    //      setUploadApplication(application);
    //     console.log('application: ', application, 'uploadApplication: ', uploadApplication);

    //     const element = document.getElementById('update_scholarship');
    //     if (element !== null) {
    //         element.showModal();
    //     }
    //     else {
    //         console.error("Element not found");
    //     }
    // }

    const handleDeleteItem = (item) => {
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
                const res = await axiosSecure.delete(`/scholarship-application/${item._id}`)
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.university_name} has been deleted.`,
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
                                    {/* < button className="btn" onClick={() => document.getElementById('update_scholarship').showModal()}> */}

                                    < button className="btn"
                                    // onClick={() => handleUpdateApplication(application)}
                                    >
                                        <FaEdit></FaEdit>
                                    </button >
                                    {/* </Link> */}
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
            <button className="btn btn-soft btn-info">Add Review</button>
        </div>
    );
};

export default MyApplications;