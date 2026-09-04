import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/Dashboard";
import Reviews from "../pages/Dashboard/Reviews/Reviews";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import PrivateRoute from "./PrivateRoute";
import ScholarshipApply from "../pages/ScholarshipApply/ScholarshipApply";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddScholarship from "../pages/Dashboard/AddScholarship/AddScholarship";
import ManageScholarships from "../pages/Dashboard/ManageScholarships/ManageScholarships";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import Payment from "../pages/Payment/Payment";
import MyApplications from "../pages/Dashboard/MyApplications/MyApplications";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'allScholarship',
        element: <AllScholarship></AllScholarship>
      },
      {
        path: 'scholarship/:id',
        element: <PrivateRoute><ScholarshipDetails></ScholarshipDetails></PrivateRoute>,
        // loader: ({ params }) => fetch(`http://localhost:5000/scholarship/${params.id}`)
      },
      {
        // path: 'payment',
        path: 'payment/:id',
        element: <Payment></Payment>
      },
      {
        path: 'scholarshipApply/:id',
        element: <PrivateRoute><ScholarshipApply></ScholarshipApply></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'profile',
        // element: 
      },
      {
        path: 'myApplication',
        element: <MyApplications></MyApplications>
      },
      {
        path: 'reviews',
        element: <Reviews></Reviews>
      },

      // moderator and admin only routes
      {
        path: 'allReviews',
        element: <ModeratorRoute><AllReviews></AllReviews></ModeratorRoute>
      },
      {
        path: 'allAppliedScholarship',
        // element: <ModeratorRoute></ModeratorRoute>
      },
      {
        path: 'addScholarship',
        // element: <AdminRoute><AddScholarship></AddScholarship></AdminRoute>
        element: <ModeratorRoute><AddScholarship></AddScholarship></ModeratorRoute>
      },
      {
        path: 'manageScholarships',
        // element: <AdminRoute><ManageScholarships></ManageScholarships></AdminRoute>
        element: <ModeratorRoute><ManageScholarships></ManageScholarships></ModeratorRoute>
      },
      // {
      //   path: 'updateScholarship/:id',
      //   element: <UpdateScholarship></UpdateScholarship>
      // },

      // admin only routes
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      }
    ]
  }
]);