import { FaEdit } from "react-icons/fa";
import useScholarship from "../../../hooks/useScholarship";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageScholarships = () => {
    const [scholarship, , refetch] = useScholarship();
    const axiosSecure = useAxiosSecure();

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
                const res = await axiosSecure.delete(`/scholarship/${item._id}`)
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div className="my-4">
            <div className="flex justify-evenly">
                <h2 className="text-3xl">All Scholarships</h2>
                <h2 className="text-3xl">Total Scholarships: {scholarship.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>University Name</th>
                            <th>Subject Category</th>
                            <th>Degree</th>
                            <th>Application Fees</th>
                            <th>Details</th>
                            <th>Edit</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scholarship.map((item, index) => <tr key={item._id} className="hover:bg-base-300">
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.university_name}</td>
                                <td>{item.subject_category}</td>
                                <td>{item.degree}</td>
                                <td className="text-right">${item.application_fees}</td>
                                <td>
                                    <button className="btn btn-ghost">

                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-ghost">
                                        <FaEdit></FaEdit>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost">
                                        <FcCancel></FcCancel>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScholarships;