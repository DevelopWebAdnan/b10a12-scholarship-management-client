import { Helmet } from "react-helmet-async";
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

    const axiosSecure = useAxiosSecure();

    const { data: scholarshipDetails = {}, isLoading } = useQuery({
        queryKey: ['scholarshipDetails', id],
        queryFn: async () => {
            const res = await axiosSecure(`/scholarship/${id}`)
            return res.data;
        }
    })
    console.log('Scholarship details: ', scholarshipDetails);
    const { _id, name, university_name, subject_name, image, country, city, deadline, application_fees, category, description, stipend, post_date, service_charge } = scholarshipDetails || {};
    console.log('_id:', _id, 'subject_name:', subject_name, 'image:', image, 'description:', description, 'stipend:', stipend, 'post_date:', post_date);

    const { data: reviews = [], isPending: isReviewsLoading } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {

            // TODO: use enabled to fetch request to the server when id is available
            const reviewRes = await axiosSecure(`/reviews/${id}`)
            return reviewRes.data;
        }
    })
    console.log('reviews:', reviews);
    if (isLoading || isReviewsLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <Helmet>
                <title>{`Scholarship Manager | Details: ${_id}`}</title>
            </Helmet>
            <Cover title="Scholarship Details"></Cover>

            <div className="p-4">
                <div className="card lg:card-side bg-base-100 shadow-sm">
                    <figure>
                        <img
                            src={image}
                            alt="scholarship details university image" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p><span className="font-bold">University Name:</span> {university_name}</p>
                        <p><span className="font-bold">Scholarship category:</span> {category}</p>
                        <p><span className="font-bold">University location/address:</span> {city}, {country}</p>
                        <p><span className="font-bold">Application Deadline:</span> {deadline}</p>
                        <p><span className="font-bold">Subject name:</span> {subject_name}</p>
                        <p><span className="font-bold">Description:</span> {description}</p>
                        <p><span className="font-bold">Stipend (if have):</span> {stipend}</p>
                        <p><span className="font-bold">Post Date:</span> {post_date}</p>
                        <p><span className="font-bold">Service Charge:</span> {service_charge}</p>
                        <p><span className="font-bold">Application Fees:</span> {application_fees}</p>

                        <div className="card-actions justify-end">
                            <Link to={`/payment/${_id}`}>
                                <button className="btn bg-cyan-500 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Apply Scholarship</button>
                            </Link>

                        </div>
                    </div>
                </div>

                <h3 className="text-2xl mt-6">All the reviews given by users for this scholarship:</h3>

                <Swiper
                    pagination={{
                        type: 'progressbar',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper my-10"
                >
                    {
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
                </Swiper>
            </div>

        </div >
    );
};

export default ScholarshipDetails;