import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// export const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateApplication = ({ updateApplication, refetch }) => {
    console.log('updateApplication from MyApplications:', updateApplication);

    // if(isLoading) {
    //     return <span className="loading loading-spinner text-info"></span>
    // }

    const { _id, address, degree, gap, gender, ssc, hsc, phone, photo,
        // applicant_Id, application_fees,  applicant_email, applicant_name, currentDate,  name,  scholarshipId, service_charge, subject, status, university_address, university_name 
    } = updateApplication;
    // const axiosOpen = useAxiosOpen();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        // reset,
        // formState,
        // formState: { isSubmitSuccessful },
        // } = useForm({defaultValues: {something: 'anything'}})
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        // const imageFile = { image: data.image[0] };

        // upload image to imgbb and get an image url
        // const res = await axiosOpen.post(image_hosting_api, imageFile, {
        //     headers: {
        //         "content-type": "multipart/form-data",
        //     }
        // })
        // if (res.data.success) {
        //     // send a scholarship along with an image url to the database
        //     const scholarship = {
        //         name: data.name,
        //         university_name: data.university_name,
        //         image: res.data.data.display_url,
        //         country: data.country,
        //         city: data.city,
        //         world_rank: data.world_rank,
        //         subject_category: data.subject_category,
        //         category: data.category,
        //         degree: data.degree,
        //         tution_fees: parseInt(data.tution_fees),
        //         application_fees: parseInt(data.application_fees),
        //         service_charge: parseInt(data.service_charge),
        //         deadline: data.deadline,
        //         post_date: data.post_date,
        //         posted_email: data.posted_email
        //     };

        const scholarshipApplication = {
            // applicant_name: data.applicant_name,
            // applicant_email: data.applicant_email,
            // applicant_Id: data.applicant_Id,
            // scholarshipId: data.scholarshipId,
            // currentDate: data.currentDate,
            // phone: parseInt(phone),
            phone: data.phone || phone,
            photo: data.photo || photo,
            address: data.address || address,
            gender: data.gender || gender,
            degree: data.degree || degree,
            ssc: parseFloat(data.ssc) || ssc,
            hsc: parseFloat(data.hsc) || hsc,
            gap: data.gap || gap,
            // status: 'pending'
        }

        // const scholarshipRes = await axiosSecure.post('/scholarship', scholarship);
        const applicationRes = await axiosSecure.patch(`/scholarship-application/${_id}`, scholarshipApplication);
        console.log(applicationRes.data);
        if (applicationRes.data.modifiedCount) {
            document.getElementById('update_application').close();
                    refetch();
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} has been updated to the scholarship application`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        // }
        // console.log('with image url ', res.data);
    }
    // useEffect(() => {
    //     if (formState.isSubmitSuccessful) {
    //         // reset({something: ""})
    //         reset()
    //     }
    // }, [formState.isSubmitSuccessful, reset]
    // )

    return (
        <div>
            <Helmet>
                {/* <title>Scholarship Manager | Update Scholarship {_id}</title> */}
                <title>{`Scholarship Manager | Update Scholarship Application: ${_id}`}</title>
            </Helmet>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('update_application').showModal()}>update_application modal</button> */}
            <dialog id="update_application" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <label className="label">Phone Number *</label>
                            <input type="tel"
                                // name="phone"
                                {...register("phone")}
                                defaultValue={phone}
                                className="input mb-6" placeholder="Phone Number *" />

                            <label className="label">Photo *</label>
                            <input type="text"
                                // name="photo" 
                                {...register("photo")}
                                defaultValue={photo}
                                className="input mb-6" placeholder="Photo *" />

                            <label className="label">Address (village, district, country) *</label>
                            <input type="text"
                                // name="address" 
                                {...register("address")}
                                defaultValue={address}
                                className="input mb-6" placeholder="Address (village, district, country) *" />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender *</legend>
                                <select
                                    defaultValue={gender}
                                    //  name="gender"
                                    {...register("gender")}
                                    className="select">
                                    <option disabled={true}>Pick a gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset my-6">
                                <legend className="fieldset-legend">Applying degree *</legend>
                                <select
                                    defaultValue={degree}
                                    // name="degree"
                                    {...register("degree")}
                                    className="select">
                                    <option disabled={true}>Pick a degree</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </select>
                            </fieldset>

                            <label className="label">SSC Result *</label>
                            <input type="text"
                                // name="ssc" 
                                {...register("ssc")}
                                defaultValue={ssc}
                                className="input mb-6" placeholder="SSC Result *" />

                            <label className="label">HSC Result *</label>
                            <input type="text"
                                // name="hsc"
                                {...register("hsc")}
                                defaultValue={hsc}
                                className="input" placeholder="HSC Result *" />

                            <fieldset className="fieldset my-6">
                                <legend className="fieldset-legend">Study gap</legend>
                                <select
                                    defaultValue={gap}
                                    // name="gap" 
                                    {...register("gap")}
                                    className="select">
                                    <option disabled={true}>Pick a study gap</option>
                                    <option>1 year</option>
                                    <option>2 years</option>
                                    <option>More than 2 years</option>
                                </select>
                                <span className="label">Optional</span>
                            </fieldset>

                            {/* <input type="text" defaultValue={university_name} placeholder="University name" className="input" disabled />
                            <input type="text" defaultValue={category} placeholder="Scholarship category" className="input" disabled />
                            <input type="text" defaultValue={subject_category} placeholder="Subject category" className="input" disabled /> */}

                            <button className="btn btn-neutral mt-4">Apply</button>
                        </fieldset>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateApplication;