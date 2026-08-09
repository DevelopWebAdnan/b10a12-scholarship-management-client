
const ScholarshipApply = () => {

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

        // post this data to database as an applied scholarship
        // if successfully inserted: sweet alert/toast that applied successfully
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={submitScholarshipApplication}>
                            <fieldset className="fieldset">
                                <label className="label">Phone Number</label>
                                <input type="number" name="phone" className="input" placeholder="Phone Number" />
                                <label className="label">Photo</label>
                                <input type="text" name="photo" className="input" placeholder="Photo" />
                                <label className="label">Address (village, district, country)</label>
                                <input type="text" name="address" className="input" placeholder="Address (village, district, country)" />
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <select defaultValue="Pick a gender" name="gender" className="select">
                                        <option disabled={true}>Pick a gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                    {/* <span className="label">Optional</span> */}
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Applying degree</legend>
                                    <select defaultValue="Pick a degree" name="degree" className="select">
                                        <option disabled={true}>Pick a degree</option>
                                        <option>Diploma</option>
                                        <option>Bachelor</option>
                                        <option>Masters</option>
                                    </select>
                                    {/* <span className="label">Optional</span> */}
                                </fieldset>
                                <label className="label">SSC Result</label>
                                <input type="text" name="ssc" className="input" placeholder="SSC Result" />
                                <label className="label">HSC Result</label>
                                <input type="text" name="hsc" className="input" placeholder="HSC Result" />
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
                                <input type="text" placeholder="University name" className="input" disabled />
                                <input type="text" placeholder="Scholarship category" className="input" disabled />
                                <input type="text" placeholder="Subject category" className="input" disabled />

                                {/* <label className="label">Email</label> */}
                                <label className="label">User Info: </label>
                                {/* <input type="email" className="input" placeholder="Email" /> */}
                                <p>User name: </p>
                                <p>User email: </p>
                                <p>User _id: (which you got from MongoDB when you added a user)</p>
                                <p>Scholarship _id: (which you got from MongoDB when you added a scholarship)</p>
                                <p>Current date: </p>
                                <button className="btn btn-neutral mt-4">Apply</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipApply;