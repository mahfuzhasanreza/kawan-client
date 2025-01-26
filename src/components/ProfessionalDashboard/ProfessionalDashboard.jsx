import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const ProfessionalDashboard = () => {
    const { userDb } = useContext(AuthContext);
    const [userType, setUserType] = useState('user');
    const [verifyProfessional, setVerifyProfessional] = useState(false);
    console.log(userDb, "User DB");

    useEffect(() => {

        const checkProfessionalStatus = async () => {
            try {
                const response = await fetch(`http://localhost:5000/professionals/${userDb.email}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data, "Professional data");

                if (data.status === 2) {
                    setUserType('professional');
                    setVerifyProfessional(true);
                    console.log("Verified Professional");
                } else if (data.status === 1) {
                    setUserType('professional');
                    setVerifyProfessional(false);
                    console.log("Unverified Professional");
                } else if (data.status === 0) {
                    setUserType('user');
                    setVerifyProfessional(false);
                    console.log("Regular User");
                }
            } catch (error) {
                console.error("Error fetching professional status:", error);
            }
        };

        checkProfessionalStatus();
    }, [userDb]);

    const getLockScreenUi = (setLock) => {
        return <button onClick={() => setLock(false)}>unlock</button>
    }

    return (
        <div>
            {verifyProfessional ?
                <h1>Professional Dashboard</h1>
                :
                <div className="flex justify-center items-center h-screen bg-white">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                        <LockClosedIcon className="h-24 w-24 text-gray-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-fuchsia-800 mb-4">Dashboard is locked</h2>
                        <p className="text-gray-600 mb-6">Please enter your information to verify</p>
                       
                        <Link to="/professional-verify-form" className="bg-fuchsia-500 text-white px-4 py-2 rounded-md hover:bg-fuchsia-600 font-semibold">Verify</Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProfessionalDashboard;