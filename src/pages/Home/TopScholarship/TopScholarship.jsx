import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useScholarship from "../../../hooks/useScholarship";

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
        </section>
    );
};

export default TopScholarship;