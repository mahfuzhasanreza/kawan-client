import React, { useContext, useEffect, useState } from 'react';
import HealthSideBar from './HealthSideBar';
import { AuthContext } from '../../providers/AuthProvider';
import UserDataInputModal from './UserDataInputModal';

const HealthDashboard = () => {

    const { loading, user, userDb, isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext);
    const [showWarning, setShowWarning] = useState(true);

    useEffect(() => {
        if (!(userDb?.hight && userDb?.weight && userDb?.gender)) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [userDb]);

    return (
        <div>
            <HealthSideBar></HealthSideBar>
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