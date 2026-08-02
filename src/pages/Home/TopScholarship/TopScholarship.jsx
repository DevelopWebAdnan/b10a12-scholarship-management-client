import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useScholarship from "../../../hooks/useScholarship";
import ScholarshipCard from "../../shared/ScholarshipCard/ScholarshipCard";

const TopScholarship = () => {
    const [scholarship] = useScholarship();
    console.log(scholarship);

    return (
        <section>
            <SectionTitle
                heading={"Top Scholarships"}
                subHeading={"We Provide Scholarships With Low Application Fees"}
            ></SectionTitle>
            Scholarships: {scholarship.length}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-16">
                {
                    scholarship.map(card => <ScholarshipCard
                        key={card._id}
                        card={card}
                    ></ScholarshipCard>)
                }
            </div>
        </section>
    );
};

export default TopScholarship;