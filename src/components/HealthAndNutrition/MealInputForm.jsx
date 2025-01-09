import React, { useState } from "react";

const MealInputForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const openModal = (mealType) => {
    setSelectedMeal(mealType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMeal("");
    setMealCalories("");
    setModalVisible(false);
  };

  const handleAddMeal = () => {
    if (mealCalories && selectedMeal) {
      const updatedMeals = { ...meals };
      updatedMeals[selectedMeal].push(parseInt(mealCalories, 10));
      setMeals(updatedMeals);
      closeModal();
    }
  };

  const calculateCalories = (mealType) =>
    meals[mealType].reduce((total, calories) => total + calories, 0);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Calorie Tracker</h2>

      {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
        <div
          key={meal}
          className="flex justify-between items-center py-3 border-b"
        >
          <div>
            <h3 className="text-lg font-medium capitalize">{meal}</h3>
            <p className="text-sm text-gray-500">
              Total:{" "}
              <span className="font-bold text-blue-600">
                {calculateCalories(meal)} kcal
              </span>
            </p>
          </div>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => openModal(meal)}
          >
            +
          </button>
        </div>
      ))}

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-box">
            <h3 className="font-bold text-lg capitalize">
              Add Food to {selectedMeal}
            </h3>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Enter Calories
              </label>
              <input
                type="number"
                value={mealCalories}
                onChange={(e) => setMealCalories(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter calories"
              />
            </div>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddMeal}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealInputForm;
