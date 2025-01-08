// import React, { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi"; // Importing icons from react-icons
// import Banner from "./Banner";
// import BMIForm from "./BMIForm";
// import HealthCondition from "./HealthCondition";
// import InputForm from "./InputForm";
// import { Link } from "react-router-dom";

// const HealthAndNutrition = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className="flex min-h-screen">
//             {/* Sidebar */}
//             <div
//                 className={`fixed left-0 h-full bg-gray-50 shadow-md transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//                     } transition-transform duration-300 ease-in-out z-50 w-64`}
//             >
//                 {/* Sidebar Header */}
//                 <div className="flex justify-end items-center p-4 pb-5 bg-white text-white">
//                     <h2 className="text-lg font-semibold">Menu</h2>
//                     {/* <button onClick={toggleSidebar}>
//                         <FiX className="text-2xl" />
//                     </button> */}
//                 </div>

//                 {/* Sidebar Links */}
//                 <ul className="p-4 space-y-4">
//                     <li>
//                         <Link to="/bmi" className="text-fuchsia-500 hover:text-fuchsia-700">
//                             Know your BMI
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/cal-burn" className="text-fuchsia-500 hover:text-fuchsia-700">
//                             Cal Burn
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/overall-health" className="text-fuchsia-500 hover:text-fuchsia-700">
//                             Your Overall Health
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/blog" className="text-fuchsia-500 hover:text-fuchsia-700">
//                             Blog
//                         </Link>
//                     </li>
//                 </ul>
//             </div>

//             {/* Sidebar Toggle Button */}
//             <button
//                 onClick={toggleSidebar}
//                 className="p-3 mt-2 bg-fuchsia-600 text-white fixed z-50 rounded-r-3xl shadow-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-300 hover:pl-5 transition-all duration-300 ease-in-out"

//             >
//                 {isSidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
//             </button>

//             {/* Main Content */}
//             <div
//                 className={`flex-1 ml-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"
//                     }`}
//             >
//                 <Banner />
//                 <InputForm />
//                 <BMIForm />
//                 <HealthCondition />
//             </div>
//         </div>
//     );
// };

// export default HealthAndNutrition;




import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import BMIForm from "./BMIForm";
import HealthCondition from "./HealthCondition";
import InputForm from "./InputForm";

const HealthAndNutrition = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeContent, setActiveContent] = useState("dashboard"); // State to manage active content

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeContent) {
            case "dashboard":
                return <div>
                    <InputForm />
                </div>;
            case "bmi":
                return <div>
                    <BMIForm />
                </div>;
            case "cal-burn":
                return <div>
                    <HealthCondition />
                </div>;
            case "overall-health":
                return <div><h1>Your Overall Health</h1><p>Content about Overall Health...</p></div>;
            case "blog":
                return <div><h1>Blog</h1><p>Content about Blog...</p></div>;
            default:
                return <div><h1>Welcome</h1><p>Select an option from the sidebar.</p></div>;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div
                className={`fixed left-0 h-full bg-gray-50 shadow-md transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50 w-64`}
            >
                <div className="flex justify-end items-center p-4 pb-12 bg-white">
                </div>
                <ul className="p-4 space-y-4">
                    <li>
                        <button
                            onClick={() => setActiveContent("dashboard")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "dashboard" ? "bg-blue-500 text-white" : ""
                                }`}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveContent("bmi")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "bmi" ? "bg-blue-500 text-white" : ""
                                }`}
                        >
                            Know your BMI
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveContent("cal-burn")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "cal-burn" ? "bg-blue-500 text-white" : ""
                                }`}
                        >
                            Cal Burn
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveContent("overall-health")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "overall-health" ? "bg-blue-500 text-white" : ""
                                }`}
                        >
                            Your Overall Health
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveContent("blog")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "blog" ? "bg-blue-500 text-white" : ""
                                }`}
                        >
                            Blog
                        </button>
                    </li>
                </ul>
            </div>

            {/* Sidebar Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="p-3 mt-2 bg-fuchsia-600 text-white fixed z-50 rounded-r-3xl shadow-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-300 hover:pl-5 transition-all duration-300 ease-in-out"
            >
                {isSidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>

            {/* Main Content */}
            <div
                className={`flex-1 ml-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"
                    }`}
            >
                <Banner />
                {renderContent()} {/* Dynamically render content */}
            </div>
        </div>
    );
};

export default HealthAndNutrition;
