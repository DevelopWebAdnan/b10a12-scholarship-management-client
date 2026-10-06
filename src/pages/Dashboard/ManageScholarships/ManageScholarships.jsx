import { FaEdit, FaInfo } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import UpdateScholarship from "../UpdateScholarship/UpdateScholarship";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../../hooks/useAxiosOpen";

const ManageScholarships = () => {

    const axiosOpen = useAxiosOpen();

    const { data: scholarships = [], refetch, isLoading } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosOpen.get('/all-scholarship')
            return res.data?.result;
        }
    })
    console.log(scholarships);

    const [updateItem, setUpdateItem] = useState({});

    const axiosSecure = useAxiosSecure();

    const handleUpdateScholarship = (item) => {

        setUpdateItem(item);
        console.log('item after setUpdateItem(item): ', item, 'updateItem after setUpdateItem(item): ', updateItem);

        const element = document.getElementById('update_scholarship');
        if (element !== null) {
            element.showModal();
        }
        else {
            console.error("Element not found");
        }
    }

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

    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Manage Scholarships</title>
            </Helmet>

            <div className="my-4">
                <div className="flex justify-evenly my-4">
                    <h2 className="text-3xl">All Scholarships</h2>
                    <h2 className="text-3xl">Total Scholarships: {scholarships.length}</h2>
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
                                scholarships.map((item, index) => <tr key={item._id} className="hover:bg-base-300">
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.university_name}</td>
                                    <td>{item.subject_category}</td>
                                    <td>{item.degree}</td>
                                    <td className="text-right">${item.application_fees}</td>
                                    <td>
                                        <Link to={`/scholarship/${item._id}`}>
                                            <button className="btn btn-ghost">
                                                <FaInfo></FaInfo>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        < button className="btn" onClick={() => handleUpdateScholarship(item)}>
                                            <FaEdit></FaEdit>
                                        </button >
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
                <UpdateScholarship item={updateItem} isLoading={isLoading} refetch={refetch}></UpdateScholarship>
                {/* } */}
            </div>
        </div>
    );
};

export default ManageScholarships;