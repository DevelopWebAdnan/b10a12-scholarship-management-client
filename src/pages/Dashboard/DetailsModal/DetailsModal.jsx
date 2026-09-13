import { Helmet } from "react-helmet-async";

const DetailsModal = ({ details, isLoading }) => {
    console.log('received prop details:', details);

    // const [scholarship, loading] = useScholarship();
    // console.log('scholarship from useScholarship():', scholarship);

    const { name, category, photo, applicant_name, phone, university_name, degree, university_address, currentDate, ssc, hsc, gap, gender, feedback } = details;
    // console.log('scholarshipId:', scholarshipId, 'category:', category);
    console.log('category:', category);

    // const scholarshipDetails = scholarship.find(singleScholarship => singleScholarship._id == scholarshipId)
    // console.log('scholarshipDetails?.category:', scholarshipDetails?.category);

    // if (isLoading || loading) {
    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <Helmet>
                {/* <title>{`Scholarship Manager | Scholarship Application Details: ${scholarshipId}`}</title> */}
            </Helmet>
            {/* <Cover title="Scholarship Application Details"></Cover> */}

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('details_modal').showModal()}>open modal</button> */}
            <dialog id="details_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <figure>
                        <img src={photo} alt="applicant image" />
                    </figure>
                    <h2 className="text-3xl">{name}</h2>
                    <p>Applied University Name: {university_name}</p>
                    <p>Applied Degree: {degree}</p>
                    {/* <p>Applied Scholarship category: {scholarshipDetails.category}</p> */}
                    <p>Applied Scholarship category: {category}</p>
                    {/* <p>University location/address: {city}, {country}</p> */}
                    <p>University location/address: {university_address}</p>
                    <p>Application Date: {currentDate}</p>
                    <p>Applicant name: {applicant_name}</p>
                    <p>Gender: {gender}</p>
                    <p>SSC: {ssc}</p>
                    <p>HSC: {hsc}</p>
                    <p>Gap: {gap}</p>
                    <p>Phone: {phone}</p>
                    <p>Feedback: {feedback}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DetailsModal;