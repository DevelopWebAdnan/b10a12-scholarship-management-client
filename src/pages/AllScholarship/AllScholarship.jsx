import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import useScholarship from "../../hooks/useScholarship";
import ScholarshipCard from "../shared/ScholarshipCard/ScholarshipCard";

const AllScholarship = () => {
    const [scholarship] = useScholarship();

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | All Scholarship</title>
            </Helmet>
            <Cover
                title="All Scholarship"
                // page="All Scholarship"
            ></Cover>
            Scholarships: {scholarship.length}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
                {
                    scholarship.map(card => <ScholarshipCard
                        key={card._id}
                        card={card}
                    ></ScholarshipCard>)
                }
            </div>
        </div>
    );
};

export default AllScholarship;