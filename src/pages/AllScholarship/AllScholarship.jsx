import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";

const AllScholarship = () => {
    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | All Scholarship</title>
            </Helmet>
            <Cover
                title="All Scholarship"
                // page="All Scholarship"
            ></Cover>
        </div>
    );
};

export default AllScholarship;