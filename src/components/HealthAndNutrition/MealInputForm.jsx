import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation } from "react-router-dom";

const MealInputForm = () => {
  const [expandedMeal, setExpandedMeal] = useState(null);
  const { userDb, healthId } = useContext(AuthContext);

  const [breakfastMeal, setBreakfastMeals] = useState([]);
  const [lunchMeal, setLunchMeals] = useState([]);
  const [dinnerMeal, setDinnerMeals] = useState([]);
  const [snacksMeal, setSnacksMeals] = useState([]);

  // // Fetch user health ID
  // const fetchUserHealthId = async () => {
  //   try {
  //     const response = await fetch(`https://kawan.onrender.com/api/v1/health`, {
  //       method: "GET",
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     const userHealthInfo = result.data.find((userHealth) => userHealth.user === userDb._id);

  //     if (userHealthInfo) {
  //       setHealthId(userHealthInfo._id);
  //     } else {
  //       console.warn("No health information found for the user.");

  //       // Create new health information for the user
  //       const createHealthResponse = await fetch(`https://kawan.onrender.com/api/v1/health`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           user: userDb._id,
  //         }),
  //       });

  //       fetchUserHealthId();
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user health ID:", error);
  //   }
  // };

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
          )
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
            case "snacks":
              {
                userMeal.havingFood.map((foodItem) => (
                  setSnacksMeals((prev) => [...prev, foodItem.foodType])
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

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchUserData();
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        console.log("Initial data fetched.");
      }
    };

    fetchInitialData();
  }, [healthId]);


  const toggleCollapse = (mealType) => {
    setExpandedMeal((prev) => (prev === mealType ? null : mealType));
  };

  return (
    <div className="m-16">
      <h1 className="text-5xl w-fit mx-auto mt-16 mb-10 font-bold text-fuchsia-700">
        Your Meals
      </h1>
      <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md space-y-4">
        {[
          { type: "breakfast", meals: breakfastMeal },
          { type: "lunch", meals: lunchMeal },
          { type: "dinner", meals: dinnerMeal },
          { type: "snacks", meals: snacksMeal },
        ].map(({ type, meals }) => (
          <div key={type}>
            <div className="flex justify-between items-center bg-gray-100 rounded-md shadow-md hover:bg-gray-200 p-4">
              <button
                className="text-left w-full"
                onClick={() => toggleCollapse(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
              <Link
                to={`/health-and-nutrition/${type}/${healthId}`}
              >
                <button
                  className="ml-4 px-3 py-1 bg-green-500 text-white rounded shadow-md hover:bg-green-600"
                //     onClick={() => {console.log(`Add meal to ${type}`)  }
                // }
                >
                  +
                </button>
              </Link>
            </div>
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