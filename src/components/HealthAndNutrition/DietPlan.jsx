import React from "react";

const DietPlan = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-fuchsia-600">Personalized Diet Plan</h1>
            <p className="mt-2 text-gray-700">
                Eating a balanced diet is vital for good health and nutrition. Here are some tips:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-600">
                <li>Include more fruits and vegetables in your meals.</li>
                <li>Opt for whole grains instead of refined grains.</li>
                <li>Choose lean proteins like fish, chicken, and beans.</li>
                <li>Stay hydrated and limit sugar intake.</li>
            </ul>
        </div>
    );
};

export default DietPlan;
