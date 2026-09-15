import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import useScholarship from "../../hooks/useScholarship";
import ScholarshipCard from "../shared/ScholarshipCard/ScholarshipCard";
import { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';.139
// import 'swiper/css/pagination';

// import { Pagination } from 'swiper/modules';

const AllScholarship = () => {
    // const axiosOpen = useAxiosOpen();
    const searchRef = useRef(null);
    const [search, setSearch] = useState("");
    // const searchQuery = searchRef.current.value;
    const [scholarship, loading] = useScholarship(search);

    // const handleSearch = searchValue => {
    const handleSearch = async () => {
        const searchValue = searchRef.current.value;
        console.log('searchValue:', searchValue);
        // console.log('search before setSearch:', search);
        setSearch(searchValue);
        // console.log('search after setSearch:', search);
        // const searchRes = await axiosOpen.get(`/scholarship?searchQuery=${searchQuery}`)
        // console.log('searchRes.data:', searchRes.data);
    }

    // const pagination = {
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    // };

    console.log(search);

    if (loading) {
        return <span className="loading loading-spinner text-info"></span>
    }

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
                    // onBlur={e => setSearch(e.target.value)}
                    // name="search"
                    ref={searchRef}
                    className="grow"
                    placeholder="Search by Scholarship, University and Degree name" />
                {/* <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd> */}
            </label>
            {/* <button onClick={(e) => handleSearch(e.target.value)} className="btn btn-dash btn-info">Search</button> */}
            {/* <button onClick={(e) => handleSearch(e.target.search?.value)} className="btn btn-dash btn-info">Search</button> */}
            <button onClick={handleSearch} className="btn btn-dash btn-info">Search</button>

            Scholarships: {scholarship.length}
            {
                scholarship.length === 0 && <p>No search results found for {search}.</p>
            }

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