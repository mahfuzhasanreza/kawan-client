

import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import AiChatbotMain from "../AiChatbot/AiChatbotMain";

const Root = () => {
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