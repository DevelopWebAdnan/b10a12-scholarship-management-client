import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import useScholarship from "../../hooks/useScholarship";
import ScholarshipCard from "../shared/ScholarshipCard/ScholarshipCard";
import { useState } from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// import { Pagination } from 'swiper/modules';

const AllScholarship = () => {
    const [search, setSearch] = useState("");
    const [scholarship] = useScholarship();

    const handleSearch = searchValue => {
        setSearch(searchValue);
    }
    // const pagination = {
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    // };

    console.log(search);

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | All Scholarship</title>
            </Helmet>
            <Cover
                title="All Scholarship"
            // page="All Scholarship"
            ></Cover>

            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    // value={search}
                    // onChange={e => setSearch(e.target.value)}
                    className="grow"
                    placeholder="Search by Scholarship, University and Degree name" />
                {/* <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd> */}
            </label>
            <button onClick={(e) => handleSearch(e.target.value)} className="btn btn-dash btn-info">Search</button>

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