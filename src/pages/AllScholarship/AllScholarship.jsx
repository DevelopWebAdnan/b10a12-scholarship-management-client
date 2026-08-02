import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import useScholarship from "../../hooks/useScholarship";
import ScholarshipCard from "../shared/ScholarshipCard/ScholarshipCard";
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// import { Pagination } from 'swiper/modules';

const AllScholarship = () => {
    const [scholarship] = useScholarship();

    // const pagination = {
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    // };

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

            {/* <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
                        {
                            scholarship.map(card => <ScholarshipCard
                                key={card._id}
                                card={card}
                            ></ScholarshipCard>)
                        }
                    </div>

                </SwiperSlide>
            </Swiper> */}
        </div>
    );
};

export default AllScholarship;