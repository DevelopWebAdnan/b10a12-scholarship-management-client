import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {

    const [sort, setSort] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?sort=${sort}`)
            return res.data;
        }
    })

    const handleChangeRole = (e, user) => {
        const role = e.target.value;
        const data = {
            role
        }
        axiosSecure.patch(`/users/role/${user._id}`, data)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.userName}'s role has been changed`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "A user has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }


        });
    }

    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div className="my-4">
            <div className="flex justify-evenly">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>

            <div className="text-right my-4">
                <button onClick={() => setSort(!sort)} className={`btn btn-neutral ${sort && 'btn-info'}`}
                >{sort ? 'Sorted by Role' : 'Sort by Role'}
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{user.userName}</td>
                                <td>{user.userEmail}</td>
                                <td>
                                    <select
                                        onChange={e => handleChangeRole(e, user)}
                                        defaultValue={user.role || "Change Role"} className="select select-xs">
                                        <option disabled={true}>Change Role</option>
                                        <option>user</option>
                                        <option>moderator</option>
                                        <option>admin</option>
                                    </select>

                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost">
                                        <FaTrash className="text-red-600"></FaTrash>
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

export default ManageUsers;