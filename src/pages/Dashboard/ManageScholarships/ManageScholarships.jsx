import { FaEdit } from "react-icons/fa";
import useScholarship from "../../../hooks/useScholarship";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxiosOpen from "../../../hooks/useAxiosOpen";
import UpdateScholarship from "../UpdateScholarship/UpdateScholarship";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
export const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageScholarships = () => {
    const { user } = useAuth();
    const [scholarship, , refetch] = useScholarship();
    const [uploadItem, setUploadItem] = useState({});

    const axiosSecure = useAxiosSecure();
    const axiosOpen = useAxiosOpen();

    const handleUpdateScholarship = (item) => {
        // Source - https://stackoverflow.com/a/75516123
        // Posted by Michael M., modified by community. See post 'Timeline' for change history
        // Retrieved 2026-08-24, License - CC BY-SA 4.0

        // const dateInput = document.getElementById('date');

        // const date = new Date(); // by default, today's date
        // dateInput.value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;

        const itemToUpload = {
            ...item,
            // post_date: new Date().toLocaleDateString(),
            posted_email: user?.email
        };

        setUploadItem(itemToUpload);
        console.log('item: ', item, 'uploadItem: ', uploadItem);
        // <UpdateScholarship item={item}></UpdateScholarship>

        const element = document.getElementById('update_scholarship');
        if (element !== null) {
            element.showModal();
            // setUploadItem(item);
        }
        else {
            console.error("Element not found");
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isSubmitSuccessful },
        // } = useForm({defaultValues: {something: 'anything'}})
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] };
        // upload image to imgbb and get an image url
        const res = await axiosOpen.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }

            // {
            //     "name": "Global Excellence Scholarship",
            //     "university_name": "University of Melbourne",
            //     "image": {
            //         "0": {}
            //     },
            //     "country": "Australia",
            //     "city": "Melbourne",
            //     "world_rank": "13",
            //     "subject_category": "Engineering",
            //     "scholarship_category": "Full-fund",
            //     "degree": "Masters",
            //     "tution_fees": "",
            //     "application_fees": "100",
            //     "service_charge": "40",
            //     "application_deadline": "2026-10-31",
            //     "post_date": "2026-08-12",
            //     "posted_user_email": "adnanbiniqbal025@gmail.com"
            // }
        })
        if (res.data.success) {
            // send a scholarship along with an image url to the database
            const scholarship = {
                name: data.name,
                university_name: data.university_name,
                image: res.data.data.display_url,
                country: data.country,
                city: data.city,
                world_rank: data.world_rank,
                subject_category: data.subject_category,
                category: data.category,
                degree: data.degree,
                tution_fees: parseInt(data.tution_fees),
                application_fees: parseInt(data.application_fees),
                service_charge: parseInt(data.service_charge),
                deadline: data.deadline,
                post_date: data.post_date,
                posted_email: data.posted_email
            };

            // const scholarshipRes = await axiosSecure.post('/scholarship', scholarship);
            // const scholarshipRes = await axiosSecure.patch(`/scholarship/${_id}`, scholarship);
            // console.log(scholarshipRes.data);
            // if (scholarshipRes.data.insertedId) {
            // show a success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} has been added to the scholarship`,
                showConfirmButton: false,
                timer: 1500
            });
            // }
        }
        console.log('with image url ', res.data);
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            // reset({something: ""})
            reset()
        }
    }, [formState.isSubmitSuccessful, reset]
    )

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/scholarship/${item._id}`)
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div className="my-4">
            <div className="flex justify-evenly">
                <h2 className="text-3xl">All Scholarships</h2>
                <h2 className="text-3xl">Total Scholarships: {scholarship.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>University Name</th>
                            <th>Subject Category</th>
                            <th>Degree</th>
                            <th>Application Fees</th>
                            <th>Details</th>
                            <th>Edit</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scholarship.map((item, index) => <tr key={item._id} className="hover:bg-base-300">
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.university_name}</td>
                                <td>{item.subject_category}</td>
                                <td>{item.degree}</td>
                                <td className="text-right">${item.application_fees}</td>
                                <td>
                                    <button className="btn btn-ghost">

                                    </button>
                                </td>
                                <td>
                                    {/* <Link to={`/dashboard/updateScholarship/${item._id}`}> */}
                                    {/* < button className="btn" onClick={() => document.getElementById('update_modal').showModal()}> */}
                                    {/* < button className="btn" onClick={() => document.getElementById('update_scholarship').showModal()}> */}

                                    < button className="btn" onClick={() => handleUpdateScholarship(item)}>
                                        <FaEdit></FaEdit>
                                    </button >
                                    {/* </Link> */}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost">
                                        <FcCancel></FcCancel>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* <UpdateModal></UpdateModal> */}

            <UpdateScholarship item={uploadItem}></UpdateScholarship>
        </div>
    );
};

export default ManageScholarships;