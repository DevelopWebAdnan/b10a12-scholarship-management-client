import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import ScholarshipCard from "../shared/ScholarshipCard/ScholarshipCard";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../hooks/useAxiosOpen";
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';.139
// import 'swiper/css/pagination';

// import { Pagination } from 'swiper/modules';

const AllScholarship = () => {
    const axiosOpen = useAxiosOpen();
    const searchRef = useRef(null);
    const [search, setSearch] = useState("");
    // const searchQuery = searchRef.current.value;
    // const [scholarship, loading] = useScholarship(search);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    console.log('search:', search, 'itemsPerPage:', itemsPerPage, 'currentPage:', currentPage);

    // const numberOfPages = Math.ceil(count/itemsPerPage);

    // const { data: scholarshipsWithCount = {}, isLoading } = useQuery({
    const { data: scholarships = [], isLoading } = useQuery({
        // queryKey: ['scholarshipsWithCount', search, currentPage, itemsPerPage],
        queryKey: ['scholarships', search, currentPage, itemsPerPage],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/scholarship-application?sort=${sort}`)
            // const res = await axiosOpen.get(`/all-scholarship?search=${search}&page=${currentPage}&limit=${itemsPerPage}`)
            const res = await axiosOpen.get(`/all-scholarship?search=${search}&page=${currentPage}&limit=${itemsPerPage}`)
            // console.log(res.data);
            return res.data?.result;
        }
    })
    // const { res.data.result:scholarships, count } = scholarshipsWithCount || {};
    // const {scholarships} = scholarshipsWithCount;
    // console.log(scholarships, count);
    console.log(scholarships);

    const { data: count = 0, isLoading: isCountLoading } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            // const res = await axiosOpen.get(`/all-scholarship?search=${search}&page=${currentPage}&limit=${itemsPerPage}`)
            const res = await axiosOpen.get('/all-scholarship')
            // console.log(res.data);
            return res.data.count;
        }
    })
    // const { res.data.result:scholarships, count } = scholarshipsWithCount || {};
    // const {scholarships} = scholarshipsWithCount;
    console.log(count);

    // const numberOfPages = Math.ceil(scholarships.length / itemsPerPage);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    // console.log('number of pages:', numberOfPages);

    // const pages = [];
    // for (let i = 0; i < numberOfPages; i++) {
    //     pages.push(i);
    //     console.log(pages);
    // }

    // if (numberOfPages) {
    const pages = [...Array(numberOfPages).keys()];
    // console.log('pages:', pages);
    // }

    // const handleSearch = searchValue => {
    const handleSearch = async () => {
        const searchValue = searchRef.current.value;
        // console.log('searchValue:', searchValue);
        // console.log('search before setSearch:', search);
        setSearch(searchValue);
        // console.log('search after setSearch:', search);
        // const searchRes = await axiosOpen.get(`/scholarship?searchQuery=${searchQuery}`)
        // console.log('searchRes.data:', searchRes.data);
    }

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevBtn = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextBtn = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    // const pagination = {
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    // };

    // console.log('search:', search);

    if (isLoading || isCountLoading) {
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

            Scholarships: {scholarships.length}
            {/* Scholarships: {res.data.count} */}
            {
                scholarships.length === 0 && <p>No search results found for "{search}" at page: {currentPage}.</p>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
                {
                    // scholarships?.map(card => <ScholarshipCard
                    scholarships && scholarships.map(card => <ScholarshipCard
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

            <div className="text-center mb-10">
                <p>Current page: {currentPage}</p>

                <button
                    onClick={handlePrevBtn}
                    // className={`btn mr-2 ${currentPage === page && 'btn-info'}`}
                    className='btn mr-2'
                >Prev</button>
                {
                    pages.map(page => <button
                        onClick={() => setCurrentPage(page)}
                        className={`btn mr-2 ${currentPage === page && 'btn-info'}`}
                        key={page}
                    >{page}</button>)
                }
                <button
                    onClick={handleNextBtn}
                    // className={`btn mr-2 ${currentPage === page && 'btn-info'}`}
                    className='btn mr-2'
                >Next</button>

                <select value={itemsPerPage} name="" id="" onChange={handleItemsPerPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>

            </div>
        </div>
    );
};

export default AllScholarship;