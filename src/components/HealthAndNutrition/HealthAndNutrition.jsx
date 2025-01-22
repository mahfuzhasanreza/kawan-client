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
import HealthDashboard from "./HealthDashboard";


const HealthAndNutrition = () => {
    const userHealth = useLoaderData();
    const { loading, user, userDb, isSidebarOpen, setIsSidebarOpen, healthId } = useContext(AuthContext);
    const [activeContent, setActiveContent] = useState("dashboard");
    const [showWarning, setShowWarning] = useState(true);
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
        <div>
            <HealthDashboard></HealthDashboard>
        </div>
    );
};

export default HealthAndNutrition;
