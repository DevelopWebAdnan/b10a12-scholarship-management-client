import { Helmet } from "react-helmet-async";
// import { useLoaderData } from "react-router-dom";
import Cover from "../shared/Cover/Cover";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Payment from "../Payment/Payment";


const ScholarshipDetails = () => {

    const { id } = useParams();
    console.log(id);

    const [total, setTotal] = useState(0);
    const axiosSecure = useAxiosSecure();

    const { data: scholarship = [] } = useQuery({
        queryKey: ['scholarship', id],
        queryFn: async () => {
            const res = await axiosSecure(`/scholarship/${id}`)
            return res.data;
        }
    })
    console.log('Scholarship details: ', scholarship);
    // const { _id, name, university_name, subject_name, image, country, city, application_deadline, application_fees, category, description, stipend, post_date, service_charge } = useLoaderData();
    const { _id, name, university_name, subject_name, image, country, city, deadline, application_fees, category, description, stipend, post_date, service_charge } = scholarship;
    console.log('subject_name:', subject_name, image, 'description:', description, 'stipend:', stipend, 'post_date:', post_date);

    // const total = application_fees + service_charge;
    // console.log('total:', application_fees, '+', service_charge, '=', total);

    const handleApplyScholarship = (application_fees, service_charge) => {
        const totalFees = application_fees + service_charge;
        console.log('totalFees inside handleApplyScholarship:', application_fees, '+', service_charge, '=', totalFees);
        setTotal(totalFees);
    }
    console.log('total after setTotal(totalFees):', total);

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
            <h2 className="text-3xl">Scholarship Details of {name}</h2>
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

            {/* <Link to="/payment">
                <button className="btn">Apply Scholarship</button>
            </Link> */}
            <button onClick={() => handleApplyScholarship(application_fees, service_charge)} className="btn">Apply Scholarship</button>

            <h3 className="text-2xl">Slider/Carousel of Review Card: All the reviews given by users for this scholarship:</h3>
            <p>Reviewer image</p>
            <p>Reviewer name</p>
            <p>Review date</p>
            <p>Rating point</p>
            <p>Reviewer Comments</p>

            {/* <UpdateScholarship scholarship={scholarship}></UpdateScholarship> */}
            <Payment total={total}></Payment>
        </div>
    );
};

export default ScholarshipDetails;