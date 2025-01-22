import React, { useState } from 'react';
import MealInput from './CalorieProgressBar';
import MealInputForm from './MealInputForm';
import HealthSideBar from './HealthSideBar';

const HealthCal = () => {
    const [healthId, setHealthId] = useState(null);
    
    return (
        <div>
            <HealthSideBar></HealthSideBar>
            <MealInput></MealInput>
            <MealInputForm healthId={healthId} setHealthId={setHealthId}></MealInputForm>
        </div>
    );
};

export default HealthCal;