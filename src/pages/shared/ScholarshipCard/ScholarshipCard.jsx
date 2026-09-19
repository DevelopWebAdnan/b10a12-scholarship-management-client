import { Link } from "react-router-dom";
import useAxiosOpen from "../../../hooks/useAxiosOpen";
import { useQuery } from "@tanstack/react-query";

const ScholarshipCard = ({ card }) => {

    // TODO: const rating = 
    // const [reviews, isLoading] = useReview();

    const axiosOpen = useAxiosOpen();

    const { _id, name, university_name, image, category, country, city, application_deadline, subject_category, application_fees } = card;
    console.log("_id:", _id);

    const { data: reviews = [], isPending: isReviewsLoading } = useQuery({
        // queryKey: ['reviews', _id],
        queryKey: ['reviews', _id],
        queryFn: async () => {
            // const reviewRes = await axiosSecure(`/scholarship?scholarshipId=${id}`)

            // TODO: use enabled to fetch request to the server when id is available
            // const reviewRes = await axiosSecure(`/reviews/${_id}`)
            const reviewRes = await axiosOpen(`/reviews/${_id}`)
            // const reviewRes = await axiosSecure(`/reviews/${id}`)
            // console.log(reviewRes.data);
            return reviewRes.data;
        }
    })
    console.log('reviews for this scholarship:', reviews);

    // if (reviews.length) {
    const totalRatings = reviews.reduce((rating, card) => rating + card.rating, 0);
    console.log('totalRatings:', totalRatings);
    const avg = totalRatings / reviews.length;
    console.log('avg:', avg);
    // }

    // Method-2:
    // const ratings = reviews.map(review => review.rating);
    // console.log('ratings:', ratings);

    // function average(numbers) {
    //     const count = numbers.length;
    //     console.log('numbers, count:', numbers, count);
    //     let sum = 0;
    //     for (const number of numbers) {
    //         sum = sum + number;
    //     }
    //     const avg = sum / count;
    //     console.log('sum:', sum);
    //     return avg;
    // }

    // if (isLoading || isReviewsLoading) {
    if (isReviewsLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <h2 className="text-cyan-400">Name: {name}</h2>
            <h2 className="text-cyan-400">Total Reviews: {reviews.length}</h2>
            {/* <h2 className="text-cyan-400">Total Ratings: {ratings?.length}</h2> */}
            <h2 className="text-cyan-400">Total Ratings: {totalRatings}</h2>
            {/* <h2 className="text-cyan-400">Average Ratings: {avg}</h2> */}

            <div className="card bg-base-100 w-96 shadow-sm">
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
                    {/* <p>Rating: (just rating point it should be the average rating point of all rating points)</p> */}
                    {/* Method-2 */}
                    {/* <p>Rating: {ratings.length && average(ratings)}</p> */}
                    <p>Rating: {reviews.length && avg}</p>
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