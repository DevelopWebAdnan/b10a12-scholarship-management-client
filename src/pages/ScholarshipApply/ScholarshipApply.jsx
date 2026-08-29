import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const ScholarshipApply = ({ university_name, category, subject_category }) => {
    console.log('university_name, category, subject_category from CheckoutForm:', university_name, category, subject_category);

    const { id } = useParams();
    console.log(id);

    const { user } = useAuth();

    const submitScholarshipApplication = e => {
        e.preventDefault();
        const form = e.target;
        const phone = form.phone.value;
        const photo = form.photo.value;
        const address = form.address.value;
        const gender = form.gender.value;
        const degree = form.degree.value;
        const ssc = form.ssc.value;
        const hsc = form.hsc.value;
        const gap = form.gap.value;

        console.log(phone, photo, address, gender, degree, ssc, hsc, gap);

        const scholarshipApplication = {
            applicant_name: user.displayName,
            applicant_email: user.email,
            // applicant_Id: id,
            // scholarshipId: 
            currentDate: new Date(),
            phone, photo, address, gender, degree, ssc, hsc, gap
        }

        // post this data to database as an applied scholarship
        fetch('http://localhost:5000/scholarship-applications', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(scholarshipApplication)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    // if successfully inserted: sweet alert/toast that applied successfully
                    // show a success popup
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} has been applied successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Apply Scholarship</title>
                {/* <title>{`Scholarship Manager | Details: ${_id}`}</title> */}
            </Helmet>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* < button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}> open modal</button > */}
            < dialog id="scholarship_apply" className="modal" >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Apply scholarship!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                    <form onSubmit={submitScholarshipApplication}>
                        <fieldset className="fieldset">
                            <label className="label">Phone Number *</label>
                            <input type="number" name="phone" className="input" placeholder="Phone Number *" required />
                            <label className="label">Photo *</label>
                            <input type="text" name="photo" className="input" placeholder="Photo *" required />
                            <label className="label">Address (village, district, country) *</label>
                            <input type="text" name="address" className="input" placeholder="Address (village, district, country) *" required />
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender *</legend>
                                <select defaultValue="Pick a gender" name="gender" className="select" required>
                                    <option disabled={true}>Pick a gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>

                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Applying degree *</legend>
                                <select defaultValue="Pick a degree" name="degree" className="select" required>
                                    <option disabled={true}>Pick a degree</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </select>

                            </fieldset>
                            <label className="label">SSC Result *</label>
                            <input type="text" name="ssc" className="input" placeholder="SSC Result *" required />
                            <label className="label">HSC Result *</label>
                            <input type="text" name="hsc" className="input" placeholder="HSC Result *" required />
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Study gap</legend>
                                <select defaultValue="Pick a study gap" name="gap" className="select">
                                    <option disabled={true}>Pick a study gap</option>
                                    <option>1 year</option>
                                    <option>2 years</option>
                                    <option>More than 2 years</option>
                                </select>
                                <span className="label">Optional</span>
                            </fieldset>
                            <input type="text" defaultValue={university_name} placeholder="University name" className="input" disabled />
                            <input type="text" defaultValue={category} placeholder="Scholarship category" className="input" disabled />
                            <input type="text" defaultValue={subject_category} placeholder="Subject category" className="input" disabled />

                            {/* <label className="label">Email</label> */}
                            <label className="label">More added Info: </label>
                            {/* <input type="email" className="input" placeholder="Email" /> */}
                            <p>User name: {user?.displayName}</p>
                            <p>User email: {user?.email}</p>
                            <p>User _id: (which you got from MongoDB when you added a user)</p>
                            <p>Scholarship _id: (which you got from MongoDB when you added a scholarship) {id}</p>
                            {/* <p>Current date: {new Date()}</p> */}
                            <p>Current date: </p>

                            <button className="btn btn-neutral mt-4">Apply</button>
                        </fieldset>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </div>

        // <div className="hero bg-base-200 min-h-screen">
        //     <div className="hero-content flex-col lg:flex-row-reverse">
        //         <div className="text-center lg:text-left">
        //             <h1 className="text-5xl font-bold">Apply scholarship</h1>
        //             <p className="py-6">
        //                 Apply scholarship.
        //             </p>
        //         </div>
        //         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        //             <div className="card-body">
        //                 <form onSubmit={submitScholarshipApplication}>

        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ScholarshipApply;