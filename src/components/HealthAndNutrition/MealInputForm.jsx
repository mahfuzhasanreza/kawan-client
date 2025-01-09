import React, { useState } from "react";

const MealInputForm = ({ setActiveContent }) => {
  const [expandedMeal, setExpandedMeal] = useState(null);

  const meals = {
    breakfast: ["Pancakes", "Eggs"],
    lunch: ["Salad", "Sandwich"],
    dinner: ["Steak", "Soup"],
    snacks: [],
  };

  const calculateCalories = (mealType) =>
    meals[mealType].reduce((total, item) => total + 100, 0); // Placeholder calorie calculation

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
                    {calculateCalories(meal)} kcal
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
                      <li key={index}>{food}</li>
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
