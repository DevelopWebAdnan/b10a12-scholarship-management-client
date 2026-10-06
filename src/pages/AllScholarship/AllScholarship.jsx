import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import ScholarshipCard from "../shared/ScholarshipCard/ScholarshipCard";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../hooks/useAxiosOpen";

const AllScholarship = () => {
    const axiosOpen = useAxiosOpen();
    const searchRef = useRef(null);
    const [search, setSearch] = useState("");

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    console.log('search:', search, 'itemsPerPage:', itemsPerPage, 'currentPage:', currentPage);
    const { data: scholarships = [], isLoading } = useQuery({
        queryKey: ['scholarships', search, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosOpen.get(`/all-scholarship?search=${search}&page=${currentPage}&limit=${itemsPerPage}`)
            return res.data?.result;
        }
    })

    const { data: count = 0, isLoading: isCountLoading } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosOpen.get('/all-scholarship')
            return res.data.count;
        }
    })
    console.log('count:', count);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handleSearch = async () => {
        const searchValue = searchRef.current.value;
        setSearch(searchValue);
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
            ></Cover>

            <div className="p-4">
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
                        ref={searchRef}
                        className="grow"
                        placeholder="Search by Scholarship, University and Degree name" />
                </label>
                <button onClick={handleSearch} className="btn btn-dash btn-info">Search</button>

                {
                    scholarships.length === 0 && <p>No search results found for "{search}" at page: {currentPage}.</p>
                }

                <h3 className="font-bold text-lg py-4">Scholarships: {scholarships.length}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
                    {
                        scholarships && scholarships.map(card => <ScholarshipCard
                            key={card._id}
                            card={card}
                        ></ScholarshipCard>)
                    }
                </div>

                <div className="text-center mb-10">
                    <p>Current page: {currentPage}</p>

                    <button
                        onClick={handlePrevBtn}
                        className='btn mr-2'
                    >Previous Page</button>
                    {
                        pages.map(page => <button
                            onClick={() => setCurrentPage(page)}
                            className={`btn mr-2 ${currentPage === page && 'btn-info'}`}
                            key={page}
                        >{page}</button>)
                    }
                    <button
                        onClick={handleNextBtn}
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
        </div>
    );
};

export default AllScholarship;