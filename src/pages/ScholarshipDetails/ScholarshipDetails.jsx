import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Cover from "../shared/Cover/Cover";


const ScholarshipDetails = () => {
    const { _id, name, university_name, subject_name, image, country, city, application_deadline, application_fees, category, description, stipend, post_date, service_charge } = useLoaderData();
    console.log(subject_name, image, description, stipend, post_date);

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Details: {_id}</title>
            </Helmet>
            <Cover title="Scholarship Details"></Cover>
            <figure>
                {/* <img src={image} alt="university image/logo" /> */}
            </figure>
            <h2 className="text-3xl">Scholarship Details of {name}</h2>
            <p>University Name: {university_name}</p>
            <p>Scholarship category: {category}</p>
            <p>University location/address: {city}, {country}</p>
            <p>Application Deadline: {application_deadline}</p>
            <p>Subject name: </p>
            <p>Description: </p>
            <p>Stipend (if have): </p>
            <p>Post Date: </p>
            <p>Service Charge: {service_charge}</p>
            <p>Application Fees: {application_fees}</p>
            <button className="btn">Apply Scholarship</button>

            <h3 className="text-2xl">Slider/Carousel of Review Card: All the reviews given by users for this scholarship:</h3>
            <p>Reviewer image</p>
            <p>Reviewer name</p>
            <p>Review date</p>
            <p>Rating point</p>
            <p>Reviewer Comments</p>
        </div>
    );
};

export default ScholarshipDetails;