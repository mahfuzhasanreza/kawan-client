import React, { useContext, useEffect, useState } from 'react';
import HealthSideBar from './HealthSideBar';
import { AuthContext } from '../../providers/AuthProvider';
import UserDataInputModal from './UserDataInputModal';

const HealthDashboard = () => {
    // const [healthId, setHealthId] = useState(null);
    const { loading, healthId, fetchUserHealthId, user, userDb, isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);
    const [showWarning, setShowWarning] = useState(true);

    // // Fetch user health ID
    // const fetchUserHealthId = async () => {
    //     try {
    //         const response = await fetch(`https://kawan.onrender.com/api/v1/health`, {
    //             method: "GET",
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const result = await response.json();
    //         const userHealthInfo = result.data.find((userHealth) => userHealth.user === userDb._id);

    //         if (userHealthInfo) {
    //             setHealthId(userHealthInfo._id);
    //         } else {
    //             console.warn("No health information found for the user.");

    //             // Create new health information for the user
    //             const createHealthResponse = await fetch(`https://kawan.onrender.com/api/v1/health`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     user: userDb._id,
    //                 }),
    //             });

    //             fetchUserHealthId();
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user health ID:", error);
    //     }
    // };

    console.log(healthId, 'HealthIDDDDDDDDDDDDDDDDDDDDDDDDD');

    useEffect(() => {
        fetchUserHealthId();
    }, []);

    // console.log(healthId, 'HealthIddddddddddddddddddddddddddddddddddddddddddddddddddddddd');

    useEffect(() => {
        if (!(userDb?.hight && userDb?.weight && userDb?.gender)) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [userDb]);

    return (
        <div>
            <HealthSideBar healthId={healthId}></HealthSideBar>
            {
                (showWarning) && (
                    <UserDataInputModal></UserDataInputModal>
                )
            }
            <div className={`${(showWarning) ? 'blur-sm bg-red-500' : 'w-96 bg-green-500'}`}>
                {/* <Dashboard></Dashboard> */}
                {/* <DietPlan></DietPlan> */}
                {/* <InputForm /> */}

                <p className="text-center font-bold text-5xl">Dashboard - Chart, Progress etc</p>
            </div>
        </div >
    );
};

export default HealthDashboard;