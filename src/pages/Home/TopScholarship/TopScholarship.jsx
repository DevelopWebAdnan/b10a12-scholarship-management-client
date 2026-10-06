import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useScholarship from "../../../hooks/useScholarship";
import ScholarshipCard from "../../shared/ScholarshipCard/ScholarshipCard";

const TopScholarship = () => {
    const [scholarship, loading] = useScholarship();

    if (loading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    return (
        <section className="my-20">
            <SectionTitle
                heading={"Top Scholarships"}
                subHeading={"We Provide Scholarships With Low Application Fees"}
            ></SectionTitle>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    scholarship.map(card => <ScholarshipCard
                        key={card._id}
                        card={card}
                    ></ScholarshipCard>)
                }
            </div>
            <div className="text-center mt-6">
                <Link to="/allScholarship">
                    <button className="btn bg-cyan-500 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">All Scholarship</button>
                </Link>
            </div>
        </section>
    );
};

export default TopScholarship;