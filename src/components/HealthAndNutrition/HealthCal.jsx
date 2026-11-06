import React, { useState } from 'react';
import MealInput from './CalorieProgressBar';
import MealInputForm from './MealInputForm';
import HealthSideBar from './HealthSideBar';
import { useParams } from 'react-router-dom';

const HealthCal = () => {
    const { healthId } = useParams();
    
    return (
        <div>
            <HealthSideBar></HealthSideBar>
            <MealInput></MealInput>
            <MealInputForm></MealInputForm>
        </div>
    );
};

export default HealthCal;