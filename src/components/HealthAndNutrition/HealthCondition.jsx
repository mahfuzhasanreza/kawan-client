import React, { useState } from "react";
import foodLottieData from '../../assets/lottie/health-and-nutrition/banner.json';
import Lottie from "lottie-react";

const HealthCondition = () => {
    const [meal, setMeal] = useState({
        havingMeal: "",
        havingFood: "",
        mealDate: "",
    });
    const [isFoodDropdownOpen, setIsFoodDropdownOpen] = useState(false);
    const [isMealDropdownOpen, setIsMealDropdownOpen] = useState(false); // State for Meal Type dropdown
    const [foodSearch, setFoodSearch] = useState("");
    const allFoodOptions = [
        "Pancakes", "Eggs", "Cereal", "Smoothie", "Toast", "Sandwich", "Salad",
        "Pasta", "Burger", "Soup", "Steak", "Roast Chicken", "Pizza", "Seafood",
        "Nuts", "Chips", "Chocolate", "Granola Bar", "Apple", "Banana", "Orange",
        "Strawberry", "Mango", "Grapes", "Sushi", "Ramen", "Dumplings", "Pad Thai",
        "Spring Rolls", "Kimchi", "Pho", "Biryani", "Tandoori Chicken",
    ];

    const filteredFoodOptions = allFoodOptions.filter((food) =>
        food.toLowerCase().includes(foodSearch.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeal((prevMeal) => ({
            ...prevMeal,
            [name]: value,
        }));
    };

    const handleFoodChange = (value) => {
        setMeal((prevMeal) => ({
            ...prevMeal,
            havingFood: value,
        }));
        setIsFoodDropdownOpen(false);
    };

    const handleMealChange = (value) => { // Function to handle Meal Type change
        setMeal((prevMeal) => ({
            ...prevMeal,
            havingMeal: value,
        }));
        setIsMealDropdownOpen(false); // Close the dropdown after selection
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("meal", meal);
        try {
            const response = await fetch("http://localhost:5000/api/v1/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // user: "674b622cb9a1d46cd1ba0a5d",
                    // fitnessLevel: "gain-weight", 
                    // BMI: "24.32",                
                    // height: "1.85",              
                    // weight: "90",                
                    // Meal: [
                    //     {
                    //         havingMeal: meal.havingMeal,
                    //         havingFood: meal.havingFood,
                    //         mealDate: meal.mealDate,
                    //     },
                    // ],
                    name: "John Doe",
                    email: "mhr1@gmail.com"
                }),
            });
            console.log("HIIIIIIIIIIIIIIIIIIIIIIII", response);
            const result = await response.json();
            if (response.ok) {
                alert("Data submitted successfully!");
                console.log(result);
            } else {
                alert("Failed to submit data!");
                console.error(result);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("An error occurred while submitting data.");
        }
    };
    

    return (
        <div className="mt-20">
            <h1 className="text-4xl font-bold text-fuchsia-700 text-center mb-6">Track Your Meal</h1>
            <div className="p-6 max-w-full bg-gradient-to-br from-fuchsia-200 to-fuchsia-50 rounded-lg flex justify-between m-8">
                <div className="w-2/3">
                    <form
                        onSubmit={handleSubmit}
                        className="pl-10 pt-3"
                    >

                        {/* Meal Type */}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-medium">Meal Type</label>
                            <div
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => setIsMealDropdownOpen(!isMealDropdownOpen)} // Toggle dropdown
                            >
                                {meal.havingMeal || "Select Meal Type"}
                            </div>

                            {isMealDropdownOpen && (
                                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul>
                                        <li
                                            className="p-3 hover:bg-blue-50 cursor-pointer"
                                            onClick={() => handleMealChange("Breakfast")}
                                        >
                                            Breakfast
                                        </li>
                                        <li
                                            className="p-3 hover:bg-blue-50 cursor-pointer"
                                            onClick={() => handleMealChange("Lunch")}
                                        >
                                            Lunch
                                        </li>
                                        <li
                                            className="p-3 hover:bg-blue-50 cursor-pointer"
                                            onClick={() => handleMealChange("Dinner")}
                                        >
                                            Dinner
                                        </li>
                                        <li
                                            className="p-3 hover:bg-blue-50 cursor-pointer"
                                            onClick={() => handleMealChange("Snacks")}
                                        >
                                            Snacks
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Food Type */}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-medium">Food Type</label>
                            <div
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => setIsFoodDropdownOpen(!isFoodDropdownOpen)}
                            >
                                {meal.havingFood[1] || "Select Food Type"}
                            </div>

                            {isFoodDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                    <input
                                        type="text"
                                        placeholder="Search Food..."
                                        value={foodSearch}
                                        onChange={(e) => setFoodSearch(e.target.value)}
                                        className="w-full p-3 border-b border-gray-300 focus:outline-none"
                                    />
                                    <ul className="max-h-60 overflow-y-auto">
                                        {filteredFoodOptions.map((food) => (
                                            <li
                                                key={food}
                                                className="p-3 hover:bg-blue-50 cursor-pointer"
                                                onClick={() => handleFoodChange(food)}
                                            >
                                                {food}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Date */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Date</label>
                            <input
                                type="date"
                                name="mealDate"
                                value={meal.mealDate}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-5 w-full bg-blue-600 text-white p-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="w-96 content-center mx-auto">
                    <Lottie animationData={foodLottieData} />
                </div>
            </div>
        </div>
    );
};

export default HealthCondition;
