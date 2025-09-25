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
import ApplyedTrainer from "../../pages/Dashboard/AdminDashboard/ApplyedTrainer";
import ApplicantDetails from "../../pages/Dashboard/AdminDashboard/ApplicantDetais";
import ForbiddenAccess from "../../shared/Forbidden/Forbidden";
import Stats from "../../pages/Dashboard/AdminDashboard/stats/Stats";
import AddClass from "../../pages/Dashboard/AdminDashboard/Add Class/AddClass";
import TrainerProtectedRoute from "../admin protected routes/TrainerProtectedRoute";
import TrainerSlots from "../../pages/Dashboard/TrainerDashboard/Slots";
import AddSlot from "../../pages/Dashboard/TrainerDashboard/AddSlot";
import ActivityLog from "../../pages/Dashboard/MemberDashbaord/Activity";
import ProfileUpdate from "../../pages/Dashboard/MemberDashbaord/ProfileUpdate";
import BookedTrainer from "../../pages/Dashboard/MemberDashbaord/BookedTrainer";
import DashHome from "../../pages/Dashboard/MemberDashbaord/dashHome";

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
      {
        path: 'ForbiddenAccess',
        Component: ForbiddenAccess
      }
    ]
  },
  {
    path: 'dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute> ,
    children:[
      {
        index: true,
        Component: DashHome,
      },
      {
        path: 'activityLog',
        Component: ActivityLog  
      },
      {
        path: 'profile',
        Component: ProfileUpdate,
      },
      {
        path: 'bookedTrainers',
        Component: BookedTrainer,
      },
      {
        path:'newsLetterSubscribers',
        element: <AdminProtectedRoutes><NewsletterSubscribers></NewsletterSubscribers></AdminProtectedRoutes>,
      },
      {
        path: 'manageTrainers',
        element: <AdminProtectedRoutes><ManageTrainers></ManageTrainers></AdminProtectedRoutes>
      },
      {
        path: 'appliedTrainers',
        element: <AdminProtectedRoutes><ApplyedTrainer></ApplyedTrainer></AdminProtectedRoutes>
      },
      {
        path: 'appliedTrainers/:id',
        element: <AdminProtectedRoutes><ApplicantDetails></ApplicantDetails></AdminProtectedRoutes>
      },
      {
        path: 'stats',
        element: <AdminProtectedRoutes><Stats></Stats></AdminProtectedRoutes>
      },
      {
        path: 'addClass',
        element: <AdminProtectedRoutes><AddClass></AddClass></AdminProtectedRoutes>
      },
      {
        path: 'slots',
        element: <TrainerProtectedRoute><TrainerSlots></TrainerSlots></TrainerProtectedRoute>
      },
      {
        path:'addSlots',
        element:<TrainerProtectedRoute><AddSlot></AddSlot></TrainerProtectedRoute>
      }
    ]
  }
]);