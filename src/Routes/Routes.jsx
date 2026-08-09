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
        path: 'scholarshipApply',
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
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'reviews',
        element: <Reviews></Reviews>
      }
    ]
  }
]);