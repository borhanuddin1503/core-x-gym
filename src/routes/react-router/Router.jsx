import { createBrowserRouter } from "react-router";
import RootLayout from "../../layouts/RootLayout";
import Register from "../../pages/Auth/register/Register";
import Login from "../../pages/Auth/login/Login";
import Home from "../../pages/Home/Home";
import AllClasses from "../../pages/all classes/AllClasses";
import PrivateRoute from "../private-routes/PrivateRoute";
import BeATrainer from "../../pages/be a trainer/BeATrainer";
import Trainers from "../../pages/trainers/Trainers";
import TrainerDetails from "../../pages/trainers/TrainerDetails";
import TrainerBooking from "../../pages/Trainer booking/TrainerBooking";
import Payment from "../../pages/Payment/Payment";
import DashboardLayout from "../../layouts/DashboardLayout";
import NewsletterSubscribers from "../../pages/Dashboard/AdminDashboard/NewsletterSubscribers";
import AdminProtectedRoutes from "../admin protected routes/AdminProtectedRoutes";
import ManageTrainers from "../../pages/Dashboard/AdminDashboard/ManageTrainer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path: 'classes',
        Component: AllClasses
      },
      {
        path:'register',
        Component:Register,
      },
      {
        path:'login',
        Component:Login,
      },
      {
        path:'be-a-trainer',
        element:<PrivateRoute><BeATrainer></BeATrainer></PrivateRoute>
      },
      {
        path:'trainers',
        Component: Trainers
      },
      {
        path:'trainer/:id',
        Component: TrainerDetails,
      }
      ,
      {
        path:'book/:id',
        Component: TrainerBooking,
      },
      {
        path:'payment/:id',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
      },
    ]
  },
  {
    path: 'dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute> ,
    children:[
      {
        path:'newsLetterSubscribers',
        element: <AdminProtectedRoutes><NewsletterSubscribers></NewsletterSubscribers></AdminProtectedRoutes>,
      },
      {
        path: 'manageTrainers',
        element: <AdminProtectedRoutes><ManageTrainers></ManageTrainers></AdminProtectedRoutes>
      }
    ]
  }
]);