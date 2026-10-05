import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUniversity, FaUsers } from "react-icons/fa";
import { MdReviews, MdSettingsApplications } from "react-icons/md";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    // TooltipContentProps,
    // TooltipIndex,
    // useRechartsTheme,
} from 'recharts';

// const AdminHome = ({ isAnimationActive, defaultIndex }) => {
const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = [] } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('admin-stats');
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['chartData'],
        queryFn: async () => {
            const res = await axiosSecure.get('scholarship-application-stats');
            return res.data;
        }
    })

    // const getIntroOfPage = (label: string | number | undefined) => {
    // const getIntroOfPage = (label) => {
    //     if (label === 'Page A') {
    //         return "Page A is about men's clothing";
    //     }
    //     if (label === 'Page B') {
    //         return "Page B is about women's dress";
    //     }
    //     if (label === 'Page C') {
    //         return "Page C is about women's bag";
    //     }
    //     if (label === 'Page D') {
    //         return 'Page D is about household goods';
    //     }
    //     if (label === 'Page E') {
    //         return 'Page E is about food';
    //     }
    //     if (label === 'Page F') {
    //         return 'Page F is about baby food';
    //     }
    //     return '';
    // };

    // const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
    const CustomTooltip = ({ active, payload, label }) => {
        //   const theme = useRechartsTheme();
        const firstPayload = payload?.[0];
        const isVisible = active && firstPayload != null;
        return (
            <div
                className="custom-tooltip"
                style={{
                    // ...theme?.typography,
                    // ...theme?.tooltip?.contentStyle,
                    visibility: isVisible ? 'visible' : 'hidden',
                }}
            >
                {isVisible && (
                    <>
                        <p className="label">{`${label} : ${firstPayload.value}`}</p>
                        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
                        {/* <p className="desc">Anything you want can be displayed here.</p> */}
                    </>
                )}
            </div>
        );
    };

    // const CustomContentOfTooltip = ({isAnimationActive,defaultIndex}, { isAnimationActive: boolean, defaultIndex: TooltipIndex,}) => {

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

            <div className="my-5">
                <BarChart
                    style={{ width: '100%', maxWidth: '300px', maxHeight: '70vh', aspectRatio: 1.618 }}
                    responsive
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid />
                    <XAxis dataKey="scholarship" niceTicks="snap125" />
                    <YAxis width="auto" niceTicks="snap125" />
                    {/* <YAxis width="revenue" niceTicks="snap125" /> */}
                    {/* <YAxis width="scholarshipApplications" niceTicks="snap125" /> */}
                    {/* <Tooltip content={CustomTooltip} isAnimationActive={isAnimationActive} defaultIndex={defaultIndex} /> */}
                    <Tooltip content={CustomTooltip} />
                    <Legend />
                    {/* <Bar dataKey="scholarshipApplications" barSize={20} isAnimationActive={isAnimationActive} /> */}
                    <Bar dataKey="scholarshipApplications" barSize={20} />
                    {/* <Bar dataKey="revenue" barSize={20} /> */}
                </BarChart>
            </div>
        </div>
    );
};

export default AdminHome;