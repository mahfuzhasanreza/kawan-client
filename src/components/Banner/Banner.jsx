import Lottie from 'lottie-react';
import bannerLottieData from '../../assets/lottie/banner.json';
import { TypeAnimation } from 'react-type-animation';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const { userDb } = useContext(AuthContext);
    const [userType, setUserType] = useState('user');
    const [verifyProfessional, setVerifyProfessional] = useState('user');
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
    }, [userDb]); // Dependency array ensures this runs when the `user` state changes


    console.log(userType, "User Type, banner");

    return (
        <div
            className='flex justify-between bg-cover bg-center opacity-80 shadow-lg h-1/2'
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url('https://i.ibb.co/Wn8KZ23/banner-Bg3.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
        >
            <div className='ml-36 hidden lg:block content-center mt-20 mx-auto z-10'>
                
                <div className='flex'>
                    <h2 className='text-6xl font-bold text-white'>
                    ADMIN DASHBOARD
                    </h2>
                </div>
                <div className='content-center mx-auto z-10'>
                    <h2 className='mt-5 text-6xl font-bold text-white'>

                        <span className='ml-24 border-b-4 border-fuchsia-600 text-fuchsia-900 bg-yellow-500 rounded-tr-full rounded-bl-full px-10'>CONTROL CENTER</span>
                    </h2>
                </div>

                <p className='text-gray-300 text-xl mt-10 mb-24'>
                Welcome to the Kawan Admin Dashboard,
                 the central hub for managing
                 
                  mental health and <br></br>self-development support.
                </p>
                {
                    (userType === 'professional') && (
                        <Link to='/professional-dashboard' className=''>
                            <button
                                type="submit"
                                className="mb-16 flex justify-center gap-2 shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-fuchsia-600 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                            >
                                Professional Dashboard
                                <svg
                                    className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                                    viewBox="0 0 16 19"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                        className="fill-gray-800 group-hover:fill-gray-800"
                                    ></path>
                                </svg>
                            </button>

                        </Link>
                    )
                }
            </div>
            <div className='mx-auto w-1/2 lg:mx-none lg:w-1/3 z-10'>
                <Lottie animationData={bannerLottieData}></Lottie>
            </div>
        </div>
    );
};

export default Banner;
