import React, { useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useParams } from 'react-router-dom';
import HealthSideBar from './HealthSideBar';

const SetTheGoal = () => {
  const [targetWeight, settargetWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [formError, setFormError] = useState('');
  const { userDb } = useContext(AuthContext);
  const { healthId } = useParams();
  console.log(healthId, 'HealthId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const targetWeight = e.target.targetWeight.value;
    const duration = e.target.duration.value;

    if (!targetWeight || !duration) {
      setFormError('Please fill in both fields.');
      return;
    }

    setFormError('');

    try {
      if (healthId) {
        // Update existing health data
        const res = await fetch(`https://kawan.onrender.com/api/v1/health/${healthId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        await res.json();

        console.log('targetWeight', targetWeight, 'duration', duration);

        const updateRes = await fetch(`https://kawan.onrender.com/api/v1/health/${healthId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            targetWeight,
            duration,
          }),
        });

        if (!updateRes.ok) {
          throw new Error(`HTTP error! status: ${updateRes.status}`);
        }

        const updateResult = await updateRes.json();
        console.log('Update successful:', updateResult);
      }

      // else {
      //   // Create new health data
      //   const createRes = await fetch('https://kawan.onrender.com/api/v1/health/create-health', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       user: userDb._id,
      //       BMI: '22.5',
      //       height: '170',
      //       weight: '65',
      //       Meal: [
      //         {
      //           havingMeal: 'Lunch',
      //           havingFood: [
      //             {
      //               foodType: 'Apple',
      //               quantity: 100,
      //             },
      //           ],
      //           havingTime: new Date().toISOString(),
      //         },
      //       ],
      //       dailyCalCount: [],
      //     }),
      //   });

      //   if (!createRes.ok) {
      //     throw new Error(`HTTP error! status: ${createRes.status}`);
      //   }

      //   const createResult = await createRes.json();
      //   console.log('Create successful:', createResult);
      // }
    } catch (error) {
      console.error('Error handling request:', error);
      setFormError('An error occurred while processing your request.');
    }
  };

  return (
    <>
      <HealthSideBar></HealthSideBar>
      <div className="pt-20 items-center min-h-screen bg-gray-100 p-4">
        <div className="p-8 rounded-xl shadow-lg w-full">
          <h2 className="text-5xl font-semibold text-center text-fuchsia-700 mb-6">Set Calorie Goal</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="targetWeight" className="block text-lg font-medium text-gray-600 mb-2">
                Targeted Weight:
              </label>
              <input
                type="number"
                id="targetWeight"
                name='targetWeight'
                value={targetWeight}
                onChange={(e) => settargetWeight(e.target.value)}
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
                name='duration'
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
    </>
  );
};

export default SetTheGoal;
