import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllReviews = () => {

    const axiosSecure = useAxiosSecure();

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure('/reviews')
            return res.data;
        }
    })
    console.log('reviews:', reviews);

    return (
        <div>
            <h2 className="text-3xl">Total Reviews: {reviews.length}</h2>
            {
                reviews.map(review => <div key={review._id}
                    className="card bg-base-100 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">{review.reviewer_name}</h2>
                        <p>Reviewed University Name: {review.university_name}</p>
                        <p>Subject Category: {review.subject_category}</p>
                        <p>Rating Points: {review.rating}</p>
                        <p>Review Comments: {review.comment}</p>
                        <p>Review Date: {review.review_date}</p>
                    </div>
                    <figure>
                        <img
                            src={review.reviewer_image}
                            alt="Reviewer image" />
                    </figure>
                </div>)
            }

        </div>
    );
};

export default AllReviews;