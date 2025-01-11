import React, { useContext, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Banner from "./Banner";
import BMIForm from "./BMIForm";
import HealthCondition from "./HealthCondition";
import InputForm from "./InputForm";
import DietPlan from "./DietPlan";
import UserDataInputModal from "./UserDataInputModal";
import MealInput from "./CalorieProgressBar";
import CalorieBurnedCalculator from "./CalorieBurnedCalculator";
import MealInputForm from "./MealInputForm";
import SetTheGoal from "./SetTheGoal";
import { AuthContext } from "../../providers/AuthProvider";
import { useLoaderData } from "react-router-dom";


const HealthAndNutrition = () => {
    const userHealth = useLoaderData();
    const { loading, user, userDb, isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);
    const [activeContent, setActiveContent] = useState("dashboard");

    // console.log(userDb, "Checkkkkk222");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeContent) {
            case "dashboard":
                return <div>
                    <UserDataInputModal></UserDataInputModal>
                    <div className={`${userDb.name ? 'blur-sm bg-green-500' : 'bg-red-500'}`}>
                        <DietPlan></DietPlan>
                        <InputForm />
                    </div>
                </div>;
            case "goal":
                return <div>
                    <SetTheGoal></SetTheGoal>
                </div>;
            case "meal-input":
                return <div>
                    <MealInput></MealInput>
                    <MealInputForm setActiveContent={setActiveContent}></MealInputForm>
                </div>;
            case "breakfast":
                return <div>
                    <HealthCondition></HealthCondition>
                </div>
            case "lunch":
                return <div>
                    <HealthCondition></HealthCondition>
                </div>
            case "dinner":
                return <div>
                    <HealthCondition></HealthCondition>
                </div>
            case "snacks":
                return <div>
                    <HealthCondition></HealthCondition>
                </div>
            default:
                return <div><h1>Welcome</h1><p>Select an option from the sidebar.</p></div>;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? "fixed h-full bg-gray-50 shadow-md transform  translate-x-0" : "fixed left-0 h-full bg-gray-50 shadow-md transform -translate-x-full"
                    } transition-transform duration-300 ease-in-out w-64`}
            >
                <div className="flex justify-end items-center p-4 mt-5 pb-12">
                </div>
                <ul className="p-4 space-y-4">
                    <li>
                        <button
                            onClick={() => setActiveContent("dashboard")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "dashboard" ? "bg-fuchsia-500 text-white" : ""
                                }`}
                        >
                            Dashboard
                        </button>
                    </li>

                    <li>
                        <button
                            onClick={() => setActiveContent("meal-input")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "meal-input" ? "bg-fuchsia-500 text-white" : ""
                                }`}
                        >
                            Calorie Calculation
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveContent("goal")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "blog" ? "bg-fuchsia-500 text-white" : ""
                                }`}
                        >
                            Set Your Goal
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveContent("blog")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "blog" ? "bg-fuchsia-500 text-white" : ""
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
                className="p-4 mt-4 bg-fuchsia-600 text-white fixed z-50 rounded-r-full shadow-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-300 hover:pl-5 transition-all duration-300 ease-in-out"
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
