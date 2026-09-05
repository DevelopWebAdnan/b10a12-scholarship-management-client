import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import Swal from "sweetalert2";

const AllReviews = () => {

    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure('/reviews')
            return res.data;
        }
    })
    console.log('reviews:', reviews);

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

    return (
        <div>
            <h2 className="text-3xl">Total Reviews: {reviews.length}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    reviews.map(review => <div key={review._id}
                        className="card bg-cyan-950 text-base-100 shadow-sm">
                        <div className="card-body">
                            <div className="flex items-center gap-5">
                                <figure>
                                    {/* <img
                                    src={review.reviewer_image}
                                    alt="Reviewer image" /> */}
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img alt="Reviewer image" src={review.reviewer_image} className="p-1 bg-base-100 rounded-b-full" />
                                        </div>
                                    </div>
                                </figure>
                                <div>
                                    <p className="mb-4">{review.reviewer_name}</p>
                                    <p className="text-cyan-400">{review.review_date}</p>
                                </div>
                            </div>
                            <h2 className="card-title">{review.university_name}</h2>
                            {/* <p>Reviewed University Name: {review.university_name}</p> */}
                            <p>Subject Category: {review.subject_category}</p>
                            {/* <p>Rating Points: {review.rating}</p> */}
                            <div className="flex items-center">
                                <p>{review.rating}</p>
                                {/* <p>Rating Points:   */}
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                {/* </p> */}
                            </div>
                            {/* <p>Review Comments: {review.comment}</p> */}
                            <p>"{review.comment}"</p>
                            {/* <p>Review Date: {review.review_date}</p> */}
                        </div>

                        <button onClick={() => handleDeleteReview(review)} className="btn btn-outline btn-info">Delete</button>
                    </div>)
                }
            </div>

        </div>
    );
};

export default AllReviews;