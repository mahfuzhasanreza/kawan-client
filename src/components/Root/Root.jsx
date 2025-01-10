

import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import AiChatbotMain from "../AiChatbot/AiChatbotMain";
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
        <div>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <AiChatbotMain></AiChatbotMain>
            <Footer></Footer>
        </div>
    );
};

export default Root;