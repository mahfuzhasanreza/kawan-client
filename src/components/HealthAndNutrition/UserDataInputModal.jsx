import React, { useState } from "react";

const UserDataInputModal = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
    });

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const closeModal = () => {
        document.getElementById("multi-step-modal").checked = false;
        setStep(1); // Reset the step on close
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <label className="block text-sm font-medium">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="input input-bordered w-full mt-2"
                            placeholder="Enter your age"
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <label className="block text-sm font-medium">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="select select-bordered w-full mt-2"
                        >
                            <option value="" disabled>
                                Select your gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <label className="block text-sm font-medium">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            className="input input-bordered w-full mt-2"
                            placeholder="Enter your height"
                        />
                    </div>
                );
            case 4:
                return (
                    <div>
                        <label className="block text-sm font-medium">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="input input-bordered w-full mt-2"
                            placeholder="Enter your weight"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <input type="checkbox" id="multi-step-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box pt-16 relative">
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute hover:bg-red-400 top-4 right-6 btn btn-sm btn-circle btn-outline"
                    >
                        ✕
                    </button>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                        <div
                            className="bg-fuchsia-500 h-2 rounded-full"
                            style={{ width: `${(step / 4) * 100}%` }}
                        ></div>
                    </div>

                    <h3 className="font-bold text-lg">Step {step} of 4</h3>
                    <div className="mt-4">{renderStepContent()}</div>
                    <div className="modal-action justify-between">
                        <button
                            className="btn btn-outline"
                            onClick={handlePrevious}
                            disabled={step === 1}
                        >
                            Previous
                        </button>
                        {step < 4 ? (
                            <button className="btn btn-accent" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                                onClick={() => console.log("Form Data: ", formData)}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Trigger Button */}
            {/* <label htmlFor="multi-step-modal" className="btn btn-primary">
        Open Modal
      </label> */}

            <div>
                {/* Trigger Button */}
                <label htmlFor="multi-step-modal" className="btn btn-warning">
                    You didn't fill the necessary input for your dashboard. Fill it now!
                </label>

                {/* Tooltip */}
                <div className="tooltip tooltip-open tooltip-bottom mt-2">
                    <span className="text-sm">Click the button to provide the required details.</span>
                </div>
            </div>

        </div>
    );
};

export default UserDataInputModal;