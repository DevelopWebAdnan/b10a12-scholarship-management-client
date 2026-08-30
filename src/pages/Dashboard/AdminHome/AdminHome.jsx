import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUniversity, FaUsers } from "react-icons/fa";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = [] } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('admin-stats');
            return res.data;
        }
    })
    return (
        <div>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-value">{stats.users}</div>
                    <div className="stat-title">Users</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUniversity className="text-3xl"></FaUniversity>
                    </div>
                    <div className="stat-value">{stats.scholarships}</div>
                    <div className="stat-title">Scholarships</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-value">{stats.scholarshipApplications}</div>
                    <div className="stat-title">Scholarship Applications</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
            </div>

            CHART
        </div>
    );
};

export default AdminHome;