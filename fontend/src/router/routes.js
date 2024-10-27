import React from "react";
// Pages - User
import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const userRoutes = [
    // User routes
    {
        path: "/",
        element: <HomePage />,
        children: [],
    },
    {
        path: "/login",
        element: <LoginPage />,
        layout: null,
    },
    {
        path: "/register",
        element: <RegisterPage />,
        layout: null,
    },
];

const adminRoutes = [];

export const routes = [...userRoutes, ...adminRoutes];

export const privateRoutes = [];
