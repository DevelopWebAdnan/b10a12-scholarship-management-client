import culturalCentre from "../../../assets/assignment-12/CulturalCenterofthePhilippines,Pasay,Philippines.jpg";
import lagosSchool from "../../../assets/assignment-12/LagosBusinessSchool,Lekki-EpeExpressway,Lagos,Nigeria(2).jpg";
import idleb from "../../../assets/assignment-12/Idleb,Syria.jpg";
import scholarship64 from "../../../assets/assignment-12/scholarship-64.png";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AboutUs = () => {
    return (
        <section className="my-20">
            {/* <SectionTitle
                heading={"About Us"}
                subHeading="We provide scholarship with our experience"
            ></SectionTitle> */}

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="flex flex-col md:flex-row gap-5 items-center">
                        <div className="flex flex-col gap-5">
                            <img
                                alt="cultural centre of the Philippines, Pasay, Philippines image"
                                src={culturalCentre}
                                className="w-full max-w-sm rounded-lg shadow-2xl"
                            />
                            <img
                                alt="Idleb, Syria image"
                                src={idleb}
                                className="w-full max-w-sm rounded-lg shadow-2xl"
                            />
                        </div>
                        <div>
                            <img
                                alt="Lagos Business School, Lekki EpeExpressway, Lagos, Nigeria image"
                                src={lagosSchool}
                                className="max-w-sm rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                    <div>
                        {/* <h2 className="text-4xl font-bold">We provide scholarship with our experience</h2> */}
                        <SectionTitle
                            heading={"About Us"}
                            subHeading="We provide scholarship with our experience"
                        ></SectionTitle>
                        <p className="pb-6">
                            Students can search their suitable scholarships and universities, also they can apply for the scholarship through our Scholarship Manager.
                        </p>
                        <div className="flex gap-2">
                            <img src={scholarship64} alt="scholarship icon" />
                            <p className="py-6 font-bold">Apply from anywhere</p>
                        </div>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;