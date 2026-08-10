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
import AddScholarship from "../pages/AddScholarship/AddScholarship";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";

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
        loader: ({ params }) => fetch(`http://localhost:5000/scholarship/${params.id}`)
      },
      {
        path: 'scholarshipApply/:id',
        element: <PrivateRoute><ScholarshipApply></ScholarshipApply></PrivateRoute>
      },
      {
        path: 'addScholarship',
        element: <PrivateRoute><AddScholarship></AddScholarship></PrivateRoute>
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
        path: 'reviews',
        element: <Reviews></Reviews>
      },
      // admin routes
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
      }
    ]
  }
]);