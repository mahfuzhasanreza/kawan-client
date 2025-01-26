

import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Root = () => {
    const { setIsSidebarOpen } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/health-and-nutrition") {
            setIsSidebarOpen(false);
        }
    }, [location, setIsSidebarOpen]);

    return (
        <div className="bg-fuchsia-50">
            <div>
                <Navbar></Navbar>
                <Outlet>
                </Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;