import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";

const HomeLayout = () => {
    return (
        <div>
            {/* renders the component of the child route that matches the current URL */}
            <Outlet />
            <Footer/>
        </div>
    );
};

export default HomeLayout;
