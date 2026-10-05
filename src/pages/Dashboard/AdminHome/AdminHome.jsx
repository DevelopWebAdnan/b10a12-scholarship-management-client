import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUniversity, FaUsers } from "react-icons/fa";
import { MdReviews, MdSettingsApplications } from "react-icons/md";

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
                        <MdSettingsApplications className="text-3xl"></MdSettingsApplications>
                    </div>
                    <div className="stat-value">{stats.scholarshipApplications}</div>
                    <div className="stat-title">Scholarship Applications</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <MdReviews className="text-3xl"></MdReviews>
                    </div>
                    <div className="stat-value">{stats.reviews}</div>
                    <div className="stat-title">Reviews</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
            </div>

            CHART
        </div>
    );
};

export default AdminHome;