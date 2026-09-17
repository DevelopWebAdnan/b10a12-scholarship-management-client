import { Helmet } from "react-helmet-async";
// import { useLoaderData } from "react-router-dom";
import Cover from "../shared/Cover/Cover";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ScholarshipDetails = () => {

    const { id } = useParams();
    console.log(id);

    // const [total, setTotal] = useState(0);
    const axiosSecure = useAxiosSecure();

    const { data: scholarshipDetails = {}, isLoading } = useQuery({
        queryKey: ['scholarshipDetails', id],
        queryFn: async () => {
            const res = await axiosSecure(`/scholarship/${id}`)
            return res.data;
        }
    })
    // console.log('Scholarship details: ', scholarshipDetails, 'scholarshipDetails.result:', scholarshipDetails.result);
    console.log('Scholarship details: ', scholarshipDetails);
    // const { _id, name, university_name, subject_name, image, country, city, application_deadline, application_fees, category, description, stipend, post_date, service_charge } = useLoaderData();
    const { _id, name, university_name, subject_name, image, country, city, deadline, application_fees, category, description, stipend, post_date, service_charge } = scholarshipDetails || {};
    console.log('_id:', _id, 'subject_name:', subject_name, 'image:', image, 'description:', description, 'stipend:', stipend, 'post_date:', post_date);

    // const { data2: reviews = [] } = useQuery({
    const { data: reviews = [], isPending: isReviewsLoading } = useQuery({
        // queryKey: ['reviews', _id],
        queryKey: ['reviews', id],
        queryFn: async () => {
            // const reviewRes = await axiosSecure(`/scholarship?scholarshipId=${id}`)

            // TODO: use enabled to fetch request to the server when id is available
            // const reviewRes = await axiosSecure(`/reviews/${_id}`)
            const reviewRes = await axiosSecure(`/reviews/${id}`)
            // console.log(reviewRes.data);
            return reviewRes.data;
        }
    })
    console.log('reviews:', reviews);
    // console.log('Reviews given for this scholarship:', scholarshipDetails.reviews);

    // const total = application_fees + service_charge;
    // console.log('total:', application_fees, '+', service_charge, '=', total);

    // const handleApplyScholarship = (application_fees) => {
    //     const totalFees = application_fees + service_charge;
    //     console.log('application_fees inside handleApplyScholarship:', application_fees);
    //     setTotal(totalFees);
    // }
    // console.log('total after setTotal(totalFees):', total);

    if (isLoading || isReviewsLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <Helmet>
                {/* <title>Scholarship Manager | Details: {_id}</title> */}
                <title>{`Scholarship Manager | Details: ${_id}`}</title>
            </Helmet>
            <Cover title="Scholarship Details"></Cover>
            <figure>
                <img src={image} alt="university image/logo" />
            </figure>
            <h2 className="text-3xl">{name}</h2>
            <p>University Name: {university_name}</p>
            <p>Scholarship category: {category}</p>
            <p>University location/address: {city}, {country}</p>
            <p>Application Deadline: {deadline}</p>
            <p>Subject name: {subject_name}</p>
            <p>Description: {description}</p>
            <p>Stipend (if have): {stipend}</p>
            <p>Post Date: {post_date}</p>
            <p>Service Charge: {service_charge}</p>
            <p>Application Fees: {application_fees}</p>

            <Link to={`/payment/${_id}`}>
                <button className="btn bg-cyan-400 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Apply Scholarship</button>
            </Link>
            {/* <button onClick={() => handleApplyScholarship(application_fees)} className="btn">Apply Scholarship</button> */}

            <h3 className="text-2xl mt-6">All the reviews given by users for this scholarship:</h3>
            {/* <p>Reviewer image</p>
            <p>Reviewer name</p>
            <p>Review date</p>
            <p>Rating point</p>
            <p>Reviewer Comments</p> */}
            {/* {
                scholarshipDetails?.reviews?.map(review => <Swiper key={review._id} */}

            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper my-10"
            >
                {/* <div className="card bg-cyan-950 text-base-100 shadow-sm">
                    <div className="card-body"> */}
                {
                    // scholarshipDetails?.reviews?.map(review => <div key={review._id}
                    // scholarshipDetails?.reviews?.map(review => <SwiperSlide
                    reviews?.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex justify-center py-10">
                            <div className="card bg-cyan-950 text-base-100 shadow-sm">
                                <div className="card-body">
                                    <div className="chat chat-start">
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img
                                                    alt="Reviewer image"
                                                    src={review.reviewer_image}
                                                />
                                            </div>
                                        </div>
                                        <div className="chat-header">
                                            {review.reviewer_name}
                                            <time className="text-xs opacity-50">{review.review_date}</time>
                                        </div>
                                        <div className="chat-bubble">{review.comment}</div>
                                        <div className="chat-footer opacity-50">{review.rating}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
                {/* </div>
                </div> */}
            </Swiper>

            {/* <UpdateScholarship scholarship={scholarship}></UpdateScholarship> */}
            {/* {total && <Payment scholarship_id={_id} total={total}></Payment>} */}
            {/* {application_fees && <Payment scholarship_id={_id} application_fees={application_fees}></Payment>} */}
        </div >
    );
};

export default ScholarshipDetails;