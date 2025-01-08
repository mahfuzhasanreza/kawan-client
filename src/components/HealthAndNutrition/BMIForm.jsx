import React, { useState } from 'react';

const BMIForm = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);

    const calculateBMI = (e) => {
        e.preventDefault();
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-white shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Calculate Your BMI</h2>
                <form onSubmit={calculateBMI}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Weight (kg)</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Height (cm)</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Calculate</button>
                </form>
                {bmi && (
                    <div className="mt-4 text-center">
                        <p className="text-lg">Your BMI is: <span className="font-bold">{bmi}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BMIForm;