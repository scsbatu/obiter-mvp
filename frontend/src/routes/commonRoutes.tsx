import React from "react";

import Login from "../screens/login/Login";
import Dashboard from "@/screens/dashboard/Dashboard";
import CommonMainDetails from "@/screens/commonMainDetailsPage/CommonMainDetails";

export const CommonRoutes = [
 {
    path: "/",
    route: <CommonMainDetails />,
    protectRoutes: false,
  },
  {
    path: "/dashboard",
    route: <Dashboard/>,
    protectRoutes: false,
  },
  {
    path: "/auth",
    route: <Login />,
    protectRoutes: false,
  },
];


