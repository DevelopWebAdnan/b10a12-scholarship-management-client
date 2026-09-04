import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditReview from "../EditReview/EditReview";

const Reviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [editReview, setEditReview] = useState({});

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: [user?.email, 'reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?email=${user.email}`)
            // console.log(res.data);
            return res.data;
        }
    })
    console.log(reviews);

    const handleDeleteReview = (review) => {
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
                const res = await axiosSecure.delete(`/review/${review._id}`)
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `Review for ${review.scholarship_name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    const handleEditReview = review => {
        setEditReview(review);
        console.log('review: ', review, 'editReview: ', editReview);

        const element = document.getElementById('edit_review')
        if (element !== null) {
            element.showModal();
        }
        else {
            console.error("Element not found");
        }
    }

    return (
        <div>
            <h2 className="text-3xl">My Reviews: {reviews.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Review comments</th>
                            <th>Review Date</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reviews.map((review, index) => <tr key={review._id}>
                                <th>{index + 1}</th>
                                <td>{review.scholarship_name}</td>
                                <td>{review.university_name}</td>
                                <td>{review.comment}</td>
                                <td>{review.review_date}</td>
                                <td>
                                    <button onClick={() => handleDeleteReview(review)} className="btn btn-ghost">
                                        <FcCancel></FcCancel>
                                    </button>
                                </td>
                                <td>
                                    < button className="btn" onClick={() => handleEditReview(review)}>
                                        <FaEdit></FaEdit>
                                    </button >
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <EditReview editReview={editReview} isLoading={isLoading} refetch={refetch}></EditReview>
        </div>
    );
};

export default Reviews;