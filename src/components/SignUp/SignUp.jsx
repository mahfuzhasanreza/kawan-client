import React, { useState } from 'react';
import signinBg from '../../assets/signin-bg.png';
import logo from '../../assets/kawanLogoMsg.png';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const SignUp = () => {
    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [newPasswordValue, setNewPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="mx-auto mb-24">
            <div className="w-10/12 lg:flex bg-white shadow-2xl p-5 rounded-2xl mx-auto mt-20">
                <div style={{ backgroundImage: `url(${signinBg})` }} className='rounded-xl w-1/2 bg-cover bg-center content-center'>
                    <div className='bg-gray-950 bg-opacity-20 w-full h-full content-center rounded-2xl'>
                        <div className="text-center space-y-5">
                            <h2 className='text-white text-opacity-90 font-bold text-6xl'>Start Your Journey</h2>
                            <p className='text-gray-400 text-4xl'>Move Towards Light</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 mb-10 card w-1/2 max-w-xl shrink-0 content-center mx-auto">
                    <h2 className='text-4xl font-bold mb-5 mx-auto text-black'>Create a new account !</h2>
                    <form className="card-body">
                        <div className='grid lg:grid-cols-2 gap-3 mb-5'>
                            {/* First Name  */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="first-name"
                                    placeholder=" "
                                    value={firstNameValue}
                                    onChange={(e) => setFirstNameValue(e.target.value)}
                                    className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pb-2 ${firstNameValue
                                        ? 'border-purple-400'
                                        : ''
                                        }`}
                                    required
                                />
                                <label
                                    htmlFor="text"
                                    className={`absolute left-3 transition-all duration-200 ease-in-out ${firstNameValue
                                        ? 'top-1 text-xs text-purple-500'
                                        : 'top-3 text-base text-gray-400'
                                        } peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-500`}
                                >
                                    First Name
                                </label>
                            </div>

                            {/* Email  */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="last-name"
                                    placeholder=" "
                                    value={lastNameValue}
                                    onChange={(e) => setLastNameValue(e.target.value)}
                                    className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pb-2 ${lastNameValue
                                        ? 'border-purple-400'
                                        : ''
                                        }`}
                                    required
                                />
                                <label
                                    htmlFor="text"
                                    className={`absolute left-3 transition-all duration-200 ease-in-out ${lastNameValue
                                        ? 'top-1 text-xs text-purple-500'
                                        : 'top-3 text-base text-gray-400'
                                        } peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-500`}
                                >
                                    Last Name
                                </label>
                            </div>
                        </div>

                        {/* Email  */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                placeholder=" "
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pb-2 ${emailValue
                                    ? 'border-purple-400'
                                    : ''
                                    }`}
                                required
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-3 transition-all duration-200 ease-in-out ${emailValue
                                    ? 'top-1 text-xs text-purple-500'
                                    : 'top-3 text-base text-gray-400'
                                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-500`}
                            >
                                Email
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative mt-6">
                            {/* Password Input */}
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder=" "
                                value={newPasswordValue}
                                onChange={(e) => setNewPasswordValue(e.target.value)}
                                className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pb-2 ${newPasswordValue ? 'border-purple-400' : ''
                                    }`}
                                required
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-3 transition-all duration-200 ease-in-out ${newPasswordValue
                                    ? 'top-1 text-xs text-purple-500'
                                    : 'top-3 text-base text-gray-400'
                                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-500`}
                            >
                                New Password
                            </label>
                            {/* Toggle Eye Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEye className='text-lg text-black'></FaEye> : <FaEyeSlash className='text-black text-lg'></FaEyeSlash>}
                            </button>
                        </div>

                        {/* Password */}
                        <div className="relative mt-6">
                            {/* Password Input */}
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder=" "
                                value={confirmPasswordValue}
                                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                                className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pb-2 ${confirmPasswordValue ? 'border-purple-400' : ''
                                    }`}
                                required
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-3 transition-all duration-200 ease-in-out ${confirmPasswordValue
                                    ? 'top-1 text-xs text-purple-500'
                                    : 'top-3 text-base text-gray-400'
                                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-500`}
                            >
                                Confirm Password
                            </label>
                            {/* Toggle Eye Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEye className='text-lg text-black'></FaEye> : <FaEyeSlash className='text-black text-lg'></FaEyeSlash>}
                            </button>
                        </div>

                        <div className="form-control mt-7">
                            <button className="btn btn-primary bg-purple-600 text-white font-bold text-lg border-none hover:bg-purple-900">Sign up</button>
                        </div>
                    </form>
                    <div className='flex items-center'>
                        <hr className='ml-10 mr-2 w-1/2 border' />
                        <p className='text-gray-500'>Or</p>
                        <hr className='mr-10 ml-2 w-1/2 border' />
                    </div>
                    <button className='btn btn-outline mx-8 mt-7 border-5 text-black text-lg font-medium gap-5 hover:bg-purple-200 hover:border-purple-200 hover:text-black'>
                        <FcGoogle className='text-4xl'></FcGoogle>
                        Sign up with Google</button>
                    <div className='mx-auto mt-8 font-medium'>
                        <p>Don't haven an account? <span><Link to={'/signin'} className='hover:underline text-blue-700 font-medium'>Login here</Link></span> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;