import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const ScholarshipApply = ({ university_name, category, subject_category, deadline }) => {
    console.log('university_name, category, subject_category, deadline from CheckoutForm:', university_name, category, subject_category, deadline);

    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const { data: userId } = useQuery({
        queryKey: [user?.email, 'userId'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/userId/${user.email}`)
            return res.data?.userId;
        }
    })
    console.log('id:', id, 'userId:', userId);

    const formattedDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    // console.log('formattedDateTime:', formattedDateTime);

    const submitScholarshipApplication = async e => {
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
            applicant_Id: userId,
            scholarshipId: id,
            currentDate: formattedDateTime,
            phone,
            photo, address, gender, degree,
            ssc,
            hsc,
            gap,
            deadline,
            status: 'Pending'
        }

        const res = await axiosSecure.post('/scholarship-applications', scholarshipApplication)
        console.log(res.data);
        if (res.data.insertedId) {
            document.getElementById('scholarship_apply').close()
            // if successfully inserted: sweet alert/toast that applied successfully
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'You have applied successfully',
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/dashboard/myApplication');
        }
    }

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Apply Scholarship: {id}</title>
            </Helmet>
            < dialog id="scholarship_apply" className="modal" >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Apply scholarship!</h3>
                    <form onSubmit={submitScholarshipApplication}>
                        <fieldset className="fieldset">
                            <label className="label">Phone Number *</label>
                            <input type="tel" name="phone" className="input mb-6" placeholder="Phone Number *" required />

                            <label className="label">Photo *</label>
                            <input defaultValue={user.photoURL} type="text" name="photo" className="input mb-6" placeholder="Photo *" required />

                            <label className="label">Address (village, district, country) *</label>
                            <input type="text" name="address" className="input mb-6" placeholder="Address (village, district, country) *" required />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender *</legend>
                                <select defaultValue="Pick a gender" name="gender" className="select" required>
                                    <option disabled={true}>Pick a gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset my-6">
                                <legend className="fieldset-legend">Applying degree *</legend>
                                <select defaultValue="Pick a degree" name="degree" className="select" required>
                                    <option disabled={true}>Pick a degree</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </select>
                            </fieldset>

                            <label className="label">SSC Result *</label>
                            <input type='text' name="ssc" className="input mb-6" placeholder="SSC Result *" min={0} max={5} required />

                            <label className="label">HSC Result *</label>
                            <input type="text" name="hsc" className="input" placeholder="HSC Result *" min={0} max={5} required />

                            <fieldset className="fieldset my-6">
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

                            <button className="btn bg-cyan-500 text-white mt-4">Apply</button>
                        </fieldset>
                    </form>
                </div>
            </dialog >
        </div>
    );
};

export default ScholarshipApply;