import React from "react";

import Login from "../screens/login/Login";
import Dashboard from "@/screens/dashboard/Dashboard";
import CommonMainDetails from "@/screens/commonMainDetailsPage/CommonMainDetails";
import About from "@/screens/about/About";

export const CommonRoutes = [
  {
    path: "/",
    route: <CommonMainDetails />,
    protectRoutes: false,
  },
  {
    path: "/dashboard",
    route: <Dashboard />,
    protectRoutes: true,
  },
  {
    path: "/auth",
    route: <Login />,
    protectRoutes: false,
  },
  {
    path: "/about",
    route: <About />,
    protectRoutes: true,
  },
];
