import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useScholarship from "../../../hooks/useScholarship";
import ScholarshipCard from "../../shared/ScholarshipCard/ScholarshipCard";

const TopScholarship = () => {
    const [scholarship, loading] = useScholarship();
    console.log(scholarship);

    // const { _id, university_name, image, category, country, city, application_deadline, subject_category, application_fees } = scholarship;
    // console.log('_id:', _id);

    // const axiosOpen = useAxiosOpen();

    // const { data: reviews = [], isPending: isReviewsLoading } = useQuery({
    //     // queryKey: ['reviews', _id],
    //     queryKey: ['reviews', _id],
    //     queryFn: async () => {
    //         // const reviewRes = await axiosSecure(`/scholarship?scholarshipId=${id}`)

    //         // TODO: use enabled to fetch request to the server when id is available
    //         // const reviewRes = await axiosSecure(`/reviews/${_id}`)
    //         const reviewRes = await axiosOpen(`/reviews/${_id}`)
    //         // const reviewRes = await axiosSecure(`/reviews/${id}`)
    //         // console.log(reviewRes.data);
    //         return reviewRes.data;
    //     }
    // })
    // console.log('reviews:', reviews);

    // if (loading || isReviewsLoading) {
    if (loading) {
        // if (isReviewsLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <section>
            <SectionTitle
                heading={"Top Scholarships"}
                subHeading={"We Provide Scholarships With Low Application Fees"}
            ></SectionTitle>
            Scholarships: {scholarship.length}

            {/* <h2 className="text-3xl">Total Reviews: {reviews.length}</h2>
            <h2 className="text-3xl">Total Rating: {reviews.rating?.length}</h2> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-16">
                {
                    scholarship.map(card => <ScholarshipCard
                        key={card._id}
                        card={card}
                    ></ScholarshipCard>)
                }
            </div>
        </section>
    );
};

export default TopScholarship;