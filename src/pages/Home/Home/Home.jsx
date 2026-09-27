import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import TopScholarship from "../TopScholarship/TopScholarship";
import AboutUs from "../AboutUs/AboutUs";
import FAQ from "../FAQ/FAQ";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Home</title>
            </Helmet>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <TopScholarship></TopScholarship>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;