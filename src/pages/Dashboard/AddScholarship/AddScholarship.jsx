import { useForm } from "react-hook-form";


const AddScholarship = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }
    // const handleAddScholarship = 
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} />
            <input {...register("university_name")} />
            <input {...register("image/logo")} />
            <input {...register("country")} />
            <input {...register("city")} />
            <input {...register("world_rank")} />

            {/* <select {...register("subject_category")}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
            </select> */}
            <select defaultValue="Pick a subject category" className="select">
                <option disabled={true}>Pick a subject category</option>
                <option>Agriculture</option>
                <option>Engineering</option>
                <option>Doctor</option>
            </select>
            <select defaultValue="Pick a scholarship category" className="select">
                <option disabled={true}>Pick a scholarship category</option>
                <option>Full-fund</option>
                <option>Partial</option>
                <option>Self-fund</option>
            </select>
            <select defaultValue="Pick a degree" className="select">
                <option disabled={true}>Pick a degree</option>
                <option>Diploma</option>
                <option>Bachelor</option>
                <option>Masters</option>
            </select>
            <input {...register("tution_fees")} />
            <input {...register("application_fees")} />
            <input {...register("service_charge")} />
            <input {...register("application_deadline")} />
            <input {...register("post_date")} />
            <input {...register("posted_user_email")} />
            <input type="submit" />
        </form>
    );
};

export default AddScholarship;