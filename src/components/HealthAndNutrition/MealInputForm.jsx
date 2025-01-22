import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MealInputForm = ({ healthId, setHealthId }) => {
  const [expandedMeal, setExpandedMeal] = useState(null);
  const { userDb } = useContext(AuthContext);

  const [breakfastMeal, setBreakfastMeals] = useState([]);
  const [lunchMeal, setLunchMeals] = useState([]);
  const [dinnerMeal, setDinnerMeals] = useState([]);
  const [snakesMeal, setSnakesMeals] = useState([]);

  // Fetch user health ID
  const fetchUserHealthId = async () => {
    try {
      const response = await fetch(`https://kawan.onrender.com/api/v1/health`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const userHealthInfo = result.data.find((userHealth) => userHealth.user === userDb._id);

      if (userHealthInfo) {
        setHealthId(userHealthInfo._id);
      } else {
        console.warn("No health information found for the user.");
      }
    } catch (error) {
      console.error("Error fetching user health ID:", error);
    }
  };

  // Fetch user meal data
  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://kawan.onrender.com/api/v1/health/${healthId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const userMeals = data.data.Meal;

      console.log(userMeals, "User meals");

      const today = new Date();

      userMeals.forEach((userMeal) => {
        const mealDate = new Date(userMeal.havingTime);
        console.log(mealDate, "Meal date");

        if (
          (today.getFullYear() === mealDate.getFullYear() &&
            today.getMonth() === mealDate.getMonth() &&
            today.getDate() === mealDate.getDate()
          ) || true
        ) {
          switch (userMeal.havingMeal) {
            case "breakfast":
              {
                userMeal.havingFood.map((foodItem) => (
                  setBreakfastMeals((prev) => [...prev, foodItem.foodType])
                ))
              }
              break;
            case "lunch":
              {
                userMeal.havingFood.map((foodItem) => (
                  setLunchMeals((prev) => [...prev, foodItem.foodType])
                ))
              }
              break;
            case "dinner":
              {
                userMeal.havingFood.map((foodItem) => (
                  setDinnerMeals((prev) => [...prev, foodItem.foodType])
                ))
              }
              break;
            case "snakes":
              {
                userMeal.havingFood.map((foodItem) => (
                  setSnakesMeals((prev) => [...prev, foodItem.foodType])
                ))
              }
              break;
            default:
              break;
          }
        }
      });

      // setMeals(updatedMeals);

    } catch (error) {
      console.error("Error fetching user meal data:", error);
    }
  };

  // Fetch data on component mount or when healthId changes
  useEffect(() => {
    if (!healthId) {
      fetchUserHealthId();
    } else {
      fetchUserData();
    }
  }, [healthId]);

  const toggleCollapse = (mealType) => {
    setExpandedMeal((prev) => (prev === mealType ? null : mealType));
  };

  return (
    // <div className="m-16">
    //   <h1 className="text-5xl w-fit mx-auto mt-16 mb-10 font-bold text-fuchsia-700">
    //     Title
    //   </h1>
    //   <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
        
    //   </div>
    // </div>

    <div className="m-16">
      <h1 className="text-5xl w-fit mx-auto mt-16 mb-10 font-bold text-fuchsia-700">
        Meal Input Form
      </h1>
      <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md space-y-4">
        {[
          { type: "breakfast", meals: breakfastMeal },
          { type: "lunch", meals: lunchMeal },
          { type: "dinner", meals: dinnerMeal },
          { type: "snakes", meals: snakesMeal },
        ].map(({ type, meals }) => (
          <div key={type}>
            <button
              className="w-full p-4 text-left bg-gray-100 rounded-md shadow-md hover:bg-gray-200"
              onClick={() => toggleCollapse(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
            {expandedMeal === type && (
              <div className="p-4 bg-gray-50 rounded-md shadow-inner">
                {meals.length > 0 ? (
                  meals.map((meal, index) => (
                    <p key={index} className="text-gray-700">
                      {meal}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No meals found for {type}.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealInputForm;


// {Object.keys(meals).map((meal, index) => (
//   <div
//     key={meal}
//     className={`py-3 ${index !== Object.keys(meals).length - 1 ? "border-b" : ""
//       }`}
//   >
//     <div
//       className="flex justify-between items-center cursor-pointer"
//       onClick={() => toggleCollapse(meal)}
//     >
//       <div>
//         <h3 className="text-lg font-medium capitalize">{meal}</h3>
//         <p className="text-sm text-gray-500">
//           Total:{" "}
//           <span className="font-bold text-yellow-600">
//             {meals[meal].length} items
//           </span>
//         </p>
//       </div>
//       <button
//         className="hover:bg-fuchsia-900 btn btn-sm bg-fuchsia-600 border-none text-2xl text-white rounded-full w-8 h-8 flex items-center justify-center"
//         onClick={(e) => {
//           e.stopPropagation(); // Prevent toggle when clicking the button
//           // setActiveContent(meal);
//         }}
//       >
//         +
//       </button>
//     </div>

//     {expandedMeal === meal && (
//       <div className="mt-4 pl-4">
//         <ul className="list-disc list-inside text-gray-700">
//           {meals[meal].length > 0 ? (
//             meals[meal].map((food, index) => (
//               <div key={index} className="flex justify-between mr-10">
//                 <li>{food}</li>
//               </div>
//             ))
//           ) : (
//             <li>No items added</li>
//           )}
//         </ul>
//       </div>
//     )}
//   </div>
// ))}