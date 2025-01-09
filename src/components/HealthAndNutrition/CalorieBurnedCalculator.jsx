import React, { useState } from "react";

const CalorieBurnedCalculator = () => {
    const [weight, setWeight] = useState(0); // Weight in kilograms
    const [hours, setHours] = useState({
        sleeping: 0,
        watchingTelevision: 0,
        deskWork: 0,
        walkingVerySlow: 0,
        walking25: 0,
        moderateIntensity: 0,
        bicyclingSlow: 0,
        walking30: 0,
        calisthenicsHome: 0,
        walking34: 0,
        bicyclingUnder10: 0,
        bicyclingStationary: 0,
        vigorousIntensity: 0,
        jogging: 0,
        heavyCalisthenics: 0,
        runningInPlace: 0,
        ropeJumping: 0,

        /*
    Light Intensity:
    1) Sleeping
    2) Watching television
    3) Writing or desk work or typing
    4) Walking, very slow, 1.7 mph(2.7km/h)
    5) Walking, 2.5 mph
    6) Moderate Intensity
    
    Moderate Intensity: 
    1) Bicycling, very slow, 50 watts
    2) Walking, 3.0 mph
    3) Calisthenics, home exercise
    4) Walking 3.4 mph
    5) Bicycling, lower than 10 mph
    6) Bicycling, stationary(100 watts)
    
    Vigorous Intensity:
    1) Vigorous Intensity,
    2) Jogging, general
    3) Heavy calisthenics
    4) Running jogging, in place
    5) Rope jumping
        */
    });
    const [totalCalories, setTotalCalories] = useState(0);

    const MET_VALUES = { // MET Values: The MET_VALUES object stores MET (Metabolic Equivalent of Task) for each activity.
        sleeping: 0.9,
        watchingTelevision: 1,
        deskWork: 1.5,
        walkingVerySlow: 2.3,
        walking25: 2.9,
        moderateIntensity: 3.5,
        bicyclingSlow: 3,
        walking30: 3.8,
        calisthenicsHome: 4.5,
        walking34: 4.3,
        bicyclingUnder10: 4,
        bicyclingStationary: 5.5,
        vigorousIntensity: 7,
        jogging: 7,
        heavyCalisthenics: 8,
        runningInPlace: 8,
        ropeJumping: 12,
    };

    const calculateCalories = () => {
        let total = 0;
        Object.keys(hours).forEach((activity) => {
            const met = MET_VALUES[activity];
            const hour = hours[activity];
            total += met * weight * hour;
        });
        setTotalCalories(total.toFixed(2));
    };

    const handleHoursChange = (e, activity) => {
        setHours({ ...hours, [activity]: parseFloat(e.target.value) || 0 });
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>Calorie Burned by Activities</h1>
            <p>
                Use this calculator to estimate the number of calories burned based on
                your activities.
            </p>

            <div style={{ marginBottom: "20px" }}>
                <label>
                    <strong>Weight (KG): </strong>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                        style={{ marginLeft: "10px", padding: "5px", width: "80px" }}
                    />
                </label>
            </div>

            {Object.keys(hours).map((activity) => (
                <div key={activity} style={{ marginBottom: "10px" }}>
                    <label>
                        <strong>{activity.replace(/([A-Z])/g, " $1")}: </strong>
                        <input
                            type="number"
                            value={hours[activity]}
                            onChange={(e) => handleHoursChange(e, activity)}
                            style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
                        />
                        <span> Hours</span>
                    </label>
                </div>
            ))}

            <button
                onClick={calculateCalories}
                style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
            >
                Calculate
            </button>

            <div style={{ marginTop: "20px" }}>
                <h2>Result for Total Calorie Burned:</h2>
                <p>
                    <strong>Total Calories Burned: </strong>
                    {totalCalories} kcal
                </p>
            </div>
        </div>
    );
};

export default CalorieBurnedCalculator;