import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const UserDataInputModal = () => {
    const { userDb, setUserDb } = useContext(AuthContext);
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

    const handleSubmit = async () => {
        fetch(`https://kawan.onrender.com/api/v1/user/${userDb._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // age: formData.age,
                gender: formData.gender,
                hight: formData.height,
                weight: formData.weight,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log('Update successful (PATCH):', data);
            })
            .catch((err) => {
                console.error('Error during update (PATCH):', err);
            });

        setUserDb({
            ...userDb,
            // age: formData.age,
            gender: formData.gender,
            hight: formData.height,
            weight: formData.weight,
        });

        closeModal();
    }


    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <label className="block text-sm font-medium">Age</label>
                        <input
                            type="number"
                            required
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
                            required
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
                            required
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
                            required
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
                        className="text-red-500 absolute border-red-500 hover:bg-red-300 top-4 right-6 btn btn-sm btn-circle"
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
                            <button className="btn btn-accent bg-fuchsia-500 hover:bg-fuchsia-400 border-none" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                                onClick={() => handleSubmit()}
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

            <div role="alert" className=" alert mb-10 bg-yellow-300 border-none px-5 rounded-none shadow-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-500 h-9 w-9 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                    <h3 className="font-bold">Dashboard not show!</h3>
                    <div className="text-xs">You have to fill some information.</div>
                </div>
                <label htmlFor="multi-step-modal" className="btn btn-sm">See</label>
            </div>

        </div>
    );
};

export default UserDataInputModal;