import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import TopScholarship from "../TopScholarship/TopScholarship";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Home</title>
            </Helmet>
            <Banner></Banner>
            <TopScholarship></TopScholarship>
        </div>
    );
};

export default Home;