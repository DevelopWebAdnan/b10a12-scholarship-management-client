import { FaEdit, FaInfo } from "react-icons/fa";
import useScholarship from "../../../hooks/useScholarship";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import UpdateScholarship from "../UpdateScholarship/UpdateScholarship";
import { Link } from "react-router-dom";

const ManageScholarships = () => {

    const [scholarship, loading, refetch] = useScholarship();
    const [updateItem, setUpdateItem] = useState({});

    const axiosSecure = useAxiosSecure();

    const handleUpdateScholarship = (item) => {
        // Source - https://stackoverflow.com/a/75516123
        // Posted by Michael M., modified by community. See post 'Timeline' for change history
        // Retrieved 2026-08-24, License - CC BY-SA 4.0

        // const itemToUpload = {
        //     ...item,
        //     post_date: new Date().toLocaleDateString(),
        //     posted_email: user?.email
        // };
        // reset modal information
        // setUpdateItem({});
        // console.log('item before setUploadItem(item): ', item, 'updateItem before setUploadItem(item): ', updateItem);

        setUpdateItem(item);
        console.log('item after setUpdateItem(item): ', item, 'updateItem after setUpdateItem(item): ', updateItem);
        // <UpdateScholarship item={item}></UpdateScholarship>

        const element = document.getElementById('update_scholarship');
        if (element !== null) {
            element.showModal();
            // setUploadItem(item);
        }
        else {
            console.error("Element not found");
        }
        // reset modal information
        // setUpdateItem({});
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

     if (loading) {
        return <span className="loading loading-spinner text-info"></span>
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
                                    <Link to={`/scholarship/${item._id}`}>
                                        <button className="btn btn-ghost">
                                            <FaInfo></FaInfo>
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    {/* <Link to={`/dashboard/updateScholarship/${item._id}`}> */}
                                    {/* < button className="btn" onClick={() => document.getElementById('update_scholarship').showModal()}> */}

                                    < button className="btn" onClick={() => handleUpdateScholarship(item)}>
                                        <FaEdit></FaEdit>
                                    </button >
                                    {/* </Link> */}
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
            {/* {updateItem && */}
                <UpdateScholarship item={updateItem} loading={loading} refetch={refetch}></UpdateScholarship>
            {/* } */}
        </div>
    );
};

export default ManageScholarships;