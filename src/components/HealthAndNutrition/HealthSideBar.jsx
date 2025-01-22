import React, { useContext, useEffect, useState } from "react";
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
import { Link, useLoaderData } from "react-router-dom";
import Dashboard from "./Dashboard";


const HealthAndNutrition = () => {
    const userHealth = useLoaderData();
    const { loading, user, userDb, isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);
    const [activeContent, setActiveContent] = useState("dashboard");
    const [showWarning, setShowWarning] = useState(true);
    const [healthId, setHealthId] = useState(null);
    const [foodData, setFoodData] = useState({
        carbohydrates: 0.0,
        fats: 0.0,
        proteins: 0.0,
        calories: 0.0,
    });


    console.log(userDb, "ChecKKKKKKKKKKKK");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (!(userDb?.hight && userDb?.weight && userDb?.gender)) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [userDb]);

    console.log(userDb.hight);

    // const renderContent = () => {
    //     switch (activeContent) {
    //         case "dashboard":
    //             return <div>
    //                 {
    //                     (showWarning) && (
    //                         <UserDataInputModal></UserDataInputModal>
    //                     )
    //                 }
    //                 <div className={`${(showWarning) ? 'blur-sm bg-red-500' : 'w-96 bg-green-500'}`}>
    //                     {/* <Dashboard></Dashboard> */}
    //                     {/* <DietPlan></DietPlan> */}
    //                     {/* <InputForm /> */}

    //                     <p className="text-center font-bold text-5xl">Dashboard - Chart, Progress etc</p>
    //                 </div>
    //             </div>;
    //         case "goal":
    //             return <div>
    //                 <SetTheGoal  setHealthId={setHealthId} healthId={healthId}></SetTheGoal>
    //             </div>;
    //         case "meal-input":
    //             return <div>
    //                 <MealInput></MealInput>
    //                 <MealInputForm healthId={healthId} setHealthId={setHealthId} setActiveContent={setActiveContent}></MealInputForm>
    //             </div>;
    //         case "breakfast":
    //             return <div>
    //                 <HealthCondition activeContent={"breakfast"} foodData={foodData} setFoodData={setFoodData} healthId={healthId} setHealthId={setHealthId} setActiveContent={setActiveContent}></HealthCondition>
    //             </div>
    //         case "lunch":
    //             return <div>
    //                 <HealthCondition  activeContent={"lunch"}  foodData={foodData} setFoodData={setFoodData} healthId={healthId} setHealthId={setHealthId} setActiveContent={setActiveContent}></HealthCondition>
    //             </div>
    //         case "dinner":
    //             return <div>
    //                 <HealthCondition activeContent={"dinner"}  foodData={foodData} setFoodData={setFoodData}  healthId={healthId} setHealthId={setHealthId} setActiveContent={setActiveContent}></HealthCondition>
    //             </div>
    //         case "snacks":
    //             return <div>
    //                 <HealthCondition activeContent={"snacks"}  foodData={foodData} setFoodData={setFoodData}  healthId={healthId} setHealthId={setHealthId} setActiveContent={setActiveContent}></HealthCondition>
    //             </div>
    //         default:
    //             return <div><h1>Welcome</h1><p>Select an option from the sidebar.</p></div>;
    //     }
    // };

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
                        <Link to="/health-and-nutrition">
                            <button
                                // onClick={() => setActiveContent("dashboard")}
                                className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "dashboard" ? "bg-fuchsia-500 text-white" : ""
                                    }`}
                            >
                                Dashboard
                            </button>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/calorie-calculation'}>
                            <button
                                // onClick={() => setActiveContent("meal-input")}
                                className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "meal-input" ? "bg-fuchsia-500 text-white" : ""
                                    }`}
                            >
                                Calorie Calculation
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button
                            // onClick={() => setActiveContent("goal")}
                            className={`text-fuchsia-500 hover:text-fuchsia-700 w-full text-left p-2 rounded-md ${activeContent === "goal" ? "bg-fuchsia-500 text-white" : ""
                                }`}
                        >
                            Set Your Goal
                        </button>
                    </li>
                    <li>
                        <button
                            // onClick={() => setActiveContent("blog")}
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
                {/* {renderContent()} Dynamically render content */}
            </div>
        </div>
    );
};

export default HealthAndNutrition;
