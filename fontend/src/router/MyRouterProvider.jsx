import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultLayout from "../layouts/DefaultLayout";

export default function MyRouterProvider() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route?.layout) {
                        Layout = route.layout;
                    }
                    if (route?.layout === null) {
                        Layout = Fragment;
                    }
                    const Page = <Layout>{route.element}</Layout>;
                    return <Route key={index} path={route.path} element={Page} />;
                })}
            </Routes>
        </BrowserRouter>
    );
}
