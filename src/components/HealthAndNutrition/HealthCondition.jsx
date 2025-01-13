import React, { useContext, useEffect, useState } from "react";
import foodLottieData from '../../assets/lottie/health-and-nutrition/banner.json';
import Lottie from "lottie-react";
import RingProgressB from "./RingProgressB";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const HealthCondition = ({  activeContent, foodData, setFoodData, healthId, setHealthId, setActiveContent }) => {
    const { userDb } = useContext(AuthContext);

    const [meal, setMeal] = useState({
        havingMeal: "",
        havingFood: "",
        mealDate: new Date().toISOString().split("T")[0],
        foodQuantity: "",
        foodUnit: "grams",
    });

    

    const [isFoodDropdownOpen, setIsFoodDropdownOpen] = useState(false);
    const [foodSearch, setFoodSearch] = useState("");
    const allFoodOptions = [
        "apple", "banana", "chicken breast", "whole wheat bread", "almonds", "broccoli", "cooked white rice", "olive oil", "salmon", "egg",

        "Pancakes", "Eggs", "Cereal", "Smoothie", "Toast", "Sandwich", "Salad",
        "Pasta", "Burger", "Soup", "Steak", "Roast Chicken", "Pizza", "Seafood",
        "Nuts", "Chips", "Chocolate", "Granola Bar", "Apple", "Banana", "Orange",
        "Strawberry", "Mango", "Grapes", "Sushi", "Ramen", "Dumplings", "Pad Thai",
        "Spring Rolls", "Kimchi", "Pho", "Biryani", "Tandoori Chicken",
    ];

    const filteredFoodOptions = allFoodOptions.filter((food) =>
        food.toLowerCase().includes(foodSearch.toLowerCase())
    );

    const unitToGrams = {
        grams: 1,
        kilograms: 1000,
        milligrams: 0.001,
        pounds: 453.592,
        ounces: 28.3495,
    };

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

    console.log("objectAAAAAAAAAAAA", activeContent);


    const foodDataCalculation = (quantity = 1.0, foodD) => {


        if (foodD) {
            let carbohydrates = foodD["carbohydrates"];
            let fats = foodD["fats"];
            let proteins = foodD["proteins"];
            let calories = foodD["calories"];
            if (quantity) {
                carbohydrates = (foodD["carbohydrates"] / 1.0) * quantity;
                fats = (foodD["fats"] / 1.0) * quantity;
                proteins = (foodD["proteins"] / 1.0) * quantity;
                calories = (foodD["calories"] / 1.0) * quantity;
            }

            setFoodData({
                carbohydrates,
                fats,
                proteins,
                calories
            })

            console.log(meal["havingFood"], "Food Nutrition Data:", foodD, "QQQQQ", quantity);
            console.log("Carbohydrates:", foodD["carbohydrates"], "+++++", carbohydrates, '+++===', foodData);
        } else {
            console.log("Food data is undefined or invalid.");
        }
    };

    useEffect(() => {
        fetch('foodNutritionData.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const foodD = data[meal["havingFood"]];                
                // Pass food data and quantity to the calculation function
                foodDataCalculation(parseFloat(meal["foodQuantity"]), foodD);
            })
            .catch((error) => {
                console.error("Error fetching food nutrition data:", error);
            });
    }, [meal["foodQuantity"], meal["havingFood"]]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert food quantity to grams before saving
        const quantityInGrams = parseFloat(meal.foodQuantity) * unitToGrams[meal.foodUnit];

        const updatedMeal = {
            ...meal,
            foodQuantity: quantityInGrams,
            foodUnit: "grams",
        };
        console.log("meal", updatedMeal);
        
        if (healthId) {
            // PATCH OPERATION - for update
            // fetch(`https://kawan.onrender.com/api/v1/health/${healthId}`, {
            //     method: "PATCH",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         Meal: [{
            //             havingMeal: meal["havingMeal"],
            //             havingFood: [
            //                 {
            //                     foodType: meal["havingFood"],
            //                     quantity: parseFloat(meal["foodQuantity"]),
            //                 }
            //             ],
            //         }],
            //     }),
            // })
            //     .then((res) => {
            //         if (!res.ok) {
            //             throw new Error(`HTTP error! status: ${res.status}`);
            //         }
            //         return res.json();
            //     })
            //     .then((data) => {
            //         console.log('Update successful (PATCH):', data);
            //     })
            //     .catch((err) => {
            //         console.error('Error during update (PATCH):', err);
            //     });



            // Fetch existing data
            fetch(`https://kawan.onrender.com/api/v1/health/${healthId}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((existingData) => {
                    console.log(existingData);
                    console.log(typeof existingData);

                    const updatedMeal = [
                        ...existingData.data.Meal,
                        {
                            havingMeal: activeContent,
                            havingTime: meal["mealDate"],
                            havingFood: [
                                {
                                    foodType: meal["havingFood"],
                                    quantity: parseFloat(meal["foodQuantity"]),
                                },
                            ],
                        },
                    ];

                    return fetch(`https://kawan.onrender.com/api/v1/health/${healthId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            Meal: updatedMeal,
                        }),
                    });
                })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Update successful with new field:", data);
                })
                .catch((err) => {
                    console.error("Error during update:", err);
                });


            setActiveContent("meal-input");
        } else {
            // POST OPERATION
            try {
                const response = await fetch("https://kawan.onrender.com/api/v1/health/create-health", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: userDb._id,
                        BMI: "22.5",
                        hight: "170",
                        weight: "65",
                        Meal: [
                            {
                                havingMeal: "Lunch",
                                havingFood: [
                                    {
                                        foodType: "apple",
                                        quantity: 50,
                                    }
                                ],
                                havingTime: meal["mealDate"],
                            }
                        ],
                        dailyCalCount: []
                    }),
                });
                console.log("Hii", response);
                const result = await response.json();
                if (response.ok) {
                    alert("Data submitted successfully!");
                    console.log(result);
                } else {
                    alert("Failed to submit data!");
                    console.error(result);
                }

                setActiveContent("meal-input");
            } catch (error) {
                console.error("Error submitting data:", error);
                alert("An error occurred while submitting data.");
            }


            setActiveContent("meal-input");
        }


        // PUT OPERATION - for update
        // fetch('https://kawan.onrender.com/api/v1/health/675dd81bf033d00792524722', {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         user: "674b622cb9a1d46cd1ba0a5d",
        //         BMI: "85",
        //     }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => { console.log(data); })





    };

    return (
        <div className="mt-20 mb-20">

            {/* ring progress */}
            <div>
                <RingProgressB foodData={foodData}></RingProgressB>
            </div>

            <h1 className="mt-10 text-5xl font-bold text-fuchsia-700 text-center mb-6">Add Your Meal</h1>
            <div className="p-6 max-w-full bg-gradient-to-br from-fuchsia-200 to-fuchsia-50 rounded-lg flex justify-between m-8">
                <div className="w-full">
                    <form
                        onSubmit={handleSubmit}
                        className="pl-10 pt-3"
                    >
                        {/* Food Type */}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-medium">Food Type</label>
                            <div
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => setIsFoodDropdownOpen(!isFoodDropdownOpen)}
                            >
                                {meal.havingFood || "Select Food Type"}
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

                        {/* Quantity */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Food Quantity</label>
                            <div className="flex">
                                <input
                                    type="number"
                                    name="foodQuantity"
                                    value={meal.foodQuantity}
                                    onChange={handleChange}
                                    placeholder="Enter quantity"
                                    className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                                <select
                                    name="foodUnit"
                                    value={meal.foodUnit}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-r-md p-3 bg-gray-100 text-gray-700 focus:outline-none"
                                >
                                    <option value="grams">Grams</option>
                                    <option value="kilograms">Kilograms</option>
                                    <option value="milligrams">Milligrams</option>
                                    <option value="pounds">Pounds</option>
                                    <option value="ounces">Ounces</option>
                                </select>
                            </div>
                        </div>

                        {/* Date */}
                        {/* <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Date</label>
                            <input
                                type="date"
                                name="mealDate"
                                value={meal.mealDate}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-5 w-full bg-green-600 text-white p-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HealthCondition;