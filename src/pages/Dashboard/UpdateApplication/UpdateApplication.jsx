import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateApplication = ({ updateApplication, isLoading, refetch }) => {
    console.log('updateApplication from MyApplications:', updateApplication);

    const { _id, address, degree, gap, gender, ssc, hsc, phone, photo, university_name} = updateApplication;
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
    } = useForm()

    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    const onSubmit = async (data) => {
        console.log(data)

        const scholarshipApplication = {
            phone: data.phone || phone,
            photo: data.photo || photo,
            address: data.address || address,
            gender: data.gender || gender,
            degree: data.degree || degree,
            ssc: data.ssc || ssc,
            hsc: data.hsc || hsc,
            gap: data.gap || gap,
        }

        const applicationRes = await axiosSecure.patch(`/scholarship-application/${_id}`, scholarshipApplication);
        console.log(applicationRes.data);
        if (applicationRes.data.modifiedCount) {
            document.getElementById('update_application').close();
            refetch();
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${university_name} has been updated to the scholarship application`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    if (isLoading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <div>
            <Helmet>
                <title>{`Scholarship Manager | Update Scholarship Application: ${_id}`}</title>
            </Helmet>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="update_application" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Update Application!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <label className="label">Phone Number *</label>
                            <input type="tel"
                                {...register("phone")}
                                defaultValue={phone}
                                className="input mb-6" placeholder="Phone Number *" />

                            <label className="label">Photo *</label>
                            <input type="text"
                                {...register("photo")}
                                defaultValue={photo}
                                className="input mb-6" placeholder="Photo *" />

                            <label className="label">Address (village, district, country) *</label>
                            <input type="text"
                                {...register("address")}
                                defaultValue={address}
                                className="input mb-6" placeholder="Address (village, district, country) *" />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender *</legend>
                                {
                                    gender && <select
                                        defaultValue={gender}
                                        {...register("gender")}
                                        className="select">
                                        <option disabled={true}>Pick a gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                }
                            </fieldset>

                            <fieldset className="fieldset my-6">
                                <legend className="fieldset-legend">Applying degree *</legend>
                                {
                                    degree && <select
                                        defaultValue={degree}
                                        {...register("degree")}
                                        className="select">
                                        <option disabled={true}>Pick a degree</option>
                                        <option>Diploma</option>
                                        <option>Bachelor</option>
                                        <option>Masters</option>
                                    </select>
                                }
                            </fieldset>

                            <label className="label">SSC Result *</label>
                            <input type="text"
                                {...register("ssc")}
                                defaultValue={ssc}
                                className="input mb-6" placeholder="SSC Result *" min={0} max={5} />

                            <label className="label">HSC Result *</label>
                            <input type="text"
                                {...register("hsc")}
                                defaultValue={hsc}
                                className="input" placeholder="HSC Result *" min={0} max={5} />

                            {
                                gap && <fieldset className="fieldset my-6">
                                    <legend className="fieldset-legend">Study gap</legend>
                                    <select
                                        defaultValue={gap}
                                        {...register("gap")}
                                        className="select">
                                        <option disabled={true}>Pick a study gap</option>
                                        <option>1 year</option>
                                        <option>2 years</option>
                                        <option>More than 2 years</option>
                                    </select>
                                    <span className="label">Optional</span>
                                </fieldset>
                            }
                            <button className="btn bg-cyan-500 text-white mt-4">Update</button>
                        </fieldset>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateApplication;