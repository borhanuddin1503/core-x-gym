import { createBrowserRouter } from "react-router";
import RootLayout from "../../layouts/RootLayout";
import Register from "../../pages/Auth/register/Register";
import Login from "../../pages/Auth/login/Login";
import Home from "../../pages/Home/Home";
import AllClasses from "../../pages/all classes/AllClasses";
import PrivateRoute from "../private-routes/PrivateRoute";
import BeATrainer from "../../pages/be a trainer/BeATrainer";
import Trainers from "../../pages/trainers/Trainers";

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
    ]
  },
]);