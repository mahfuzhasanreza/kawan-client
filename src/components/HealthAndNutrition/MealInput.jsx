import React, { useState } from "react";

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
        <div>
            <div className="w-1/2 mx-auto mt-10">
                <h2 className="text-xl font-bold mb-4">Calorie Tracker</h2>

                {/* Calorie Goal Input */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Set Daily Calorie Goal</label>
                    <input
                        type="number"
                        value={calorieGoal}
                        onChange={handleGoalChange}
                        className="input input-bordered w-full"
                        placeholder="Enter calorie goal"
                    />
                </div>
                {/* Meal Calories Input */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Add Calories for Meal</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={mealCalories}
                            onChange={(e) => setMealCalories(e.target.value)}
                            className="input input-bordered flex-grow"
                            placeholder="Enter meal calories"
                        />
                        <button onClick={handleAddCalories} className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-11/12 p-6 mx-auto bg-white rounded-lg shadow-md">
                {/* Progress Bar */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Calorie Progress</label>
                    <div className="relative w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                        <div
                            className="bg-green-500 h-full"
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
