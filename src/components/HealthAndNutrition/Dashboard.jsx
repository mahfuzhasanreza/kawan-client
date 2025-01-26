import React from "react";
import { useSpring, animated } from "react-spring"; // Import animation hooks from react-spring

const Dashboard = () => {

    const height=8;
    const weight=48;
    const bmi="8";
    const suggestions="DDDAAAAAAAAAAAAAAAAAAAA"

    fetch(`https://kawan.onrender.com/api/v1/health/${healthId}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
        });


    // Use react-spring for smooth animation on component load
    const props = useSpring({
        opacity: 1,
        transform: "translateY(0px)",
        from: { opacity: 0, transform: "translateY(-50px)" },
        config: { duration: 800 },
    });

    return (
        <animated.div style={props} className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    Health Dashboard
                </h1>

                {/* BMI Card */}
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">BMI</h2>
                        <p className="text-4xl font-bold text-blue-600 mt-4">{bmi}</p>
                        <p className="text-lg text-gray-600 mt-2">
                            {bmi < 18.5
                                ? "Underweight"
                                : bmi < 24.9
                                    ? "Normal weight"
                                    : bmi < 29.9
                                        ? "Overweight"
                                        : "Obese"}
                        </p>
                    </div>

                    {/* Height Card */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Height</h2>
                        <p className="text-4xl font-bold text-green-600 mt-4">{height} cm</p>
                    </div>

                    {/* Weight Card */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Weight</h2>
                        <p className="text-4xl font-bold text-red-600 mt-4">{weight} kg</p>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Suggestions
                    </h2>
                    <div className="space-y-4">
                        {suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <p className="text-lg text-gray-700">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </animated.div>
    );
};

export default Dashboard;
