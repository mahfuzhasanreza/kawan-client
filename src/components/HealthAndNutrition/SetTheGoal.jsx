import React, { useState } from 'react';

const SetTheGoal = () => {
  const [calorieGoal, setCalorieGoal] = useState('');
  const [duration, setDuration] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!calorieGoal || !duration) {
      setFormError('Please fill in both fields.');
      return;
    }
    alert(`Goal set! Calorie Goal: ${calorieGoal} kcal, Duration: ${duration} days`);
    setFormError('');
  };

  return (
    <div className="pt-20 items-center min-h-screen bg-gray-100 p-4">
      <div className="p-8 rounded-xl shadow-lg w-full">
        <h2 className="text-5xl font-semibold text-center text-fuchsia-700 mb-6">Set Calorie Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="calorieGoal" className="block text-lg font-medium text-gray-600 mb-2">
              Targeted Weight:
            </label>
            <input
              type="number"
              id="calorieGoal"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your weight goal"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="duration" className="block text-lg font-medium text-gray-600 mb-2">
              Time Duration (days):
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter duration in days"
            />
          </div>
          {formError && <p className="text-red-500 text-center mb-4">{formError}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-700 text-white text-lg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Set Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetTheGoal;
