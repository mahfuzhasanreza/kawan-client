import React, { useState } from "react";
import MealInputForm from "./MealInputForm";
import HealthCondition from "./HealthCondition";
import CalorieBurnedCalculator from "./CalorieBurnedCalculator";
import { set } from "react-hook-form";

const MealInput = () => {
    const [calorieGoal, setCalorieGoal] = useState(2000); // Default calorie goal
    const [caloriesConsumed, setCaloriesConsumed] = useState(0); // Total consumed calories
    const [mealCalories, setMealCalories] = useState(""); // Input for meal calories

    const handleAddCalories = () => {
        const calorieValue = parseInt(mealCalories, 10);
        if (!isNaN(calorieValue) && calorieValue > 0) {
            setCaloriesConsumed(caloriesConsumed + calorieValue);
            setMealCalories("");
        }
    };

    const handleGoalChange = (e) => {
        const newGoal = parseInt(e.target.value, 10);
        if (!isNaN(newGoal) && newGoal > 0) {
            setCalorieGoal(newGoal);
        }
    };

    const caloriesLeft = Math.max(0, calorieGoal - caloriesConsumed);
    const progressPercentage = Math.min((caloriesConsumed / calorieGoal) * 100, 100).toFixed(1); // Limit to 1 decimal place

    return (
        <div className="w-2/3 mx-auto">
            <h1 className="mb-4 text-6xl font-bold w-fit mx-auto mt-20 text-fuchsia-700">Calorie Tracker</h1>

            {/* <div className="border-2 border-dashed bg-fuchsia-400 ml-16 mr-16">

            </div> */}

            {/* today's calorie progress */}
            <div className="w-full px-16 p-10 mx-auto">
                {/* Progress Bar */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Today's Calorie Target</label>
                    <div className="relative w-full bg-gray-300 h-4 rounded-full overflow-hidden">
                        <div
                            className="bg-blue-500 h-full"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 flex justify-between">
                        <span>Progress: <span className="font-bold">{progressPercentage}%</span></span>
                        <span>Calories Left: <span className="font-bold">{caloriesLeft}</span></span>
                    </p>
                </div>

                {/* Summary */}
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <p className="text-sm">
                        You have consumed{" "}
                        <span className="font-bold text-green-600">{caloriesConsumed}</span>{" "}
                        calories today.
                    </p>
                    {caloriesLeft > 0 ? (
                        <p className="text-sm">
                            You still have{" "}
                            <span className="font-bold text-blue-600">{caloriesLeft}</span>{" "}
                            calories left for the day. Keep going!
                        </p>
                    ) : (
                        <p className="text-sm text-red-600">
                            You've reached or exceeded your daily calorie goal. Great job!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealInput;
