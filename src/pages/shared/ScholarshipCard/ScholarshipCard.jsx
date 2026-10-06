import { Link } from "react-router-dom";
import useAxiosOpen from "../../../hooks/useAxiosOpen";
import { useQuery } from "@tanstack/react-query";

const ScholarshipCard = ({ card }) => {

    // TODO: const rating = 
    // const [reviews, isLoading] = useReview();

    const axiosOpen = useAxiosOpen();

    const { _id, university_name, image, category, country, city, application_deadline, subject_category, application_fees } = card;

    const { data: reviews = [], isPending: isReviewsLoading } = useQuery({
        queryKey: ['reviews', _id],
        queryFn: async () => {
            // const reviewRes = await axiosSecure(`/scholarship?scholarshipId=${id}`)

            // TODO: use enabled to fetch request to the server when id is available
            // const reviewRes = await axiosSecure(`/reviews/${_id}`)
            const reviewRes = await axiosOpen(`/reviews/${_id}`)
            return reviewRes.data;
        }
    })

    const totalRatings = reviews.reduce((rating, card) => rating + card.rating, 0);
    const avg = totalRatings / reviews.length;

    if (isReviewsLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            {/* <h2 className="text-cyan-400">Name: {name}</h2>
            <h2 className="text-cyan-400">Total Reviews: {reviews.length}</h2>
            <h2 className="text-cyan-400">Total Ratings: {totalRatings}</h2> */}

            <div className="card bg-base-100 shadow-sm">
                <figure>
                    <img
                        src={image}
                        className="h-42"
                        alt="image" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{university_name}</h2>
                    <p>{category}</p>
                    <p>{city}, {country}</p>
                    <p>{application_deadline}</p>
                    <p>{subject_category}</p>
                    <p>{application_fees}</p>
                   
                    <p>Rating: {reviews.length ? avg : ""}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/scholarship/${_id}`}>
                            <button className="btn bg-cyan-500 text-white">Scholarship Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipCard;