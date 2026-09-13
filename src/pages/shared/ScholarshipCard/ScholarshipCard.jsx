import { Link } from "react-router-dom";

const ScholarshipCard = ({ card }) => {

    // TODO: const rating = 
    const { _id, university_name, image, category, country, city, application_deadline, subject_category, application_fees } = card;

    return (
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
                <p>Rating: (just rating point it should be the average rating point of all rating points),{}</p>
                <div className="card-actions justify-end">
                    <Link to={`/scholarship/${_id}`}>
                        <button className="btn bg-cyan-500 text-white">Scholarship Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipCard;