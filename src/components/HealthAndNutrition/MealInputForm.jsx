import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MealInputForm = ({ setActiveContent }) => {
  const [expandedMeal, setExpandedMeal] = useState(null);
  const { userDb } = useContext(AuthContext);
  const [healthId, setHealthId] = useState(null);

  const [meals, setMeals] = useState({
    breakfast: [],
    // breakfastQuantity: [],
    lunch: [],
    // lunchQuantity: [],
    dinner: [],
    // dinnerQuantity: [],
    snacks: [],
    // snacksQuantity: [],
  });


  useEffect(() => {

    // meals["breakfast"] = [];
    // meals["breakfastQuantity"] = [];
    // meals["lunch"] = [];
    // meals["lunchQuantity"] = [];
    // meals["dinner"] = [];
    // meals["dinnerQuantity"] = [];
    // meals["snacks"] = [];
    // meals["snacksQuantity"] = [];

    // get health id
    const fetchUserHealthId = async () => {
      try {
        const response = await fetch(`https://kawan.onrender.com/api/v1/health`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const userHealthInfo = result.data.find(userHealth => userHealth.user === userDb._id);
        setHealthId(userHealthInfo._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://kawan.onrender.com/api/v1/health/${healthId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const userFoodStatus = data.data.Meal.map((userFood) => {
          const today = new Date();
          const havingDate = new Date(userFood.havingTime);

          // console.log(today,"--------------=");
          // console.log(havingDate);

          if (
            today.getFullYear() === havingDate.getFullYear() &&
            today.getMonth() === havingDate.getMonth() &&
            today.getDate() === havingDate.getDate()
          ) {
            if (userFood.havingMeal === "Dinner") {
              userFood.havingFood.map(food => {
                setMeals({
                  ...meals,
                  dinner: [...meals["dinner"], food.foodType],
                });
              })
            } else if (userFood.havingMeal === "Lunch") {
              userFood.havingFood.map(food => {
                setMeals({
                  ...meals,
                  lunch: [...meals["lunch"], food.foodType],
                });
              })
            } else if (userFood.havingMeal === "Breakfast") {
              userFood.havingFood.map(food => {
                setMeals({
                  ...meals,
                  breakfast: [...meals["breakfast"], food.foodType],
                });
              })
            } else if (userFood.havingMeal === "Snacks") {
              userFood.havingFood.map(food => {
                setMeals({
                  ...meals,
                  snacks: [...meals["snacks"], food.foodType],
                });
              })
            }
          }
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserHealthId();
    console.log(healthId, "lll");
    if (healthId) {
      fetchUserData();
    }
  }, [healthId]);

  console.log(meals["lunch"], "LAST");


  // const calculateCalories = (mealType) =>
  //   meals[mealType].reduce((total, item) => total + 100, 0); // Placeholder calorie calculation

  const toggleCollapse = (mealType) => {
    setExpandedMeal((prev) => (prev === mealType ? null : mealType));
  };

  return (
    <div className="m-16">
      <h1 className="text-5xl w-fit mx-auto mt-16 mb-10 font-bold text-fuchsia-700">
        Title
      </h1>
      <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
        {Object.keys(meals).map((meal, index) => (
          <div
            key={meal}
            className={`py-3 ${index !== Object.keys(meals).length - 1 ? "border-b" : ""}`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleCollapse(meal)}
            >
              <div>
                <h3 className="text-lg font-medium capitalize">{meal}</h3>
                <p className="text-sm text-gray-500">
                  Total: {" "}
                  <span className="font-bold text-yellow-600">
                    {
                      // calculateCalories(meal)
                    } kcal
                  </span>
                </p>
              </div>
              <button
                className="hover:bg-fuchsia-900 btn btn-sm bg-fuchsia-600 border-none text-2xl text-white rounded-full w-8 h-8 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggle when clicking the button
                  setActiveContent(meal);
                }}
              >
                +
              </button>
            </div>

            {expandedMeal === meal && (
              <div className="mt-4 pl-4">
                <ul className="list-disc list-inside text-gray-700">
                  {meals[meal].length > 0 ? (
                    meals[meal].map((food, index) => (
                      <div key={index} className="flex justify-between mr-10">
                        <li key={index}>{food}</li>
                      </div>
                    ))
                  ) : (
                    <li>No items added</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealInputForm;
