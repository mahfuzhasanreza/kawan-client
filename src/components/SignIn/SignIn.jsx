import React, { useContext, useRef, useState } from 'react';
import signinBg from '../../assets/signin-bg.png';
import logo from '../../assets/kawanLogoMsg.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';


const SignIn = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const emailRef = useRef();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        // Reset status
        setSuccess(false);


        try {
            const result = await signInUser(email, password);
            console.log(result.user);
            setSuccess(true);
            e.target.reset();
            navigate(location?.state ? location.state : '/');
        } catch (error) {
            toast.error(error.message); // Trigger toast notification
        }
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        navigate('/forget-password', { state: { inputEmail: email } });
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            console.log(result.user);
            navigate(location?.state ? location.state : '/');
        } catch (error) {
            console.error('Google login error:', error.message);
        }
    };

    return (
        <div className="mx-auto mb-24">
            <Helmet>
                <title>SignIn | Kawan</title>
            </Helmet>
            <div className="w-10/12 lg:flex bg-white shadow-2xl p-5 rounded-2xl mx-auto mt-20">
                <div style={{ backgroundImage: `url(${signinBg})` }} className='rounded-xl w-1/2 bg-cover bg-center content-center'>
                    <div className='bg-gray-950 bg-opacity-20 w-full h-full content-center rounded-2xl'>
                        <div className="text-center space-y-5">
                            <h2 className='text-white text-opacity-90 font-bold text-5xl'>Meet Your Friend - KAWAN</h2>
                            <p className='text-gray-400 text-4xl'>Move Towards Light</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 mb-10 card w-1/2 max-w-xl shrink-0 content-center mx-auto">
                    <h2 className='text-4xl font-bold mb-5 mx-auto text-black'>Welcome Back !</h2>
                    <form onSubmit={handleLogin}
                        className="card-body">
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
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                                className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pb-2 ${passwordValue ? 'border-purple-400' : ''
                                    }`}
                                required
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-3 transition-all duration-200 ease-in-out ${passwordValue
                                    ? 'top-1 text-xs text-purple-500'
                                    : 'top-3 text-base text-gray-400'
                                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-500`}
                            >
                                Password
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
                        <label onClick={handleForgetPassword}
                            className="label">
                            <a href="#" className="label-text-alt link link-hover text-blue-700 font-medium">Forgotten password?</a>
                        </label>

                        <div className="form-control mt-2">
                            <button className="btn btn-primary bg-purple-600 text-white font-bold text-lg border-none hover:bg-purple-900">Login</button>
                        </div>
                    </form>
                    <div className='flex items-center'>
                        <hr className='ml-10 mr-2 w-1/2 border' />
                        <p className='text-gray-500'>Or</p>
                        <hr className='mr-10 ml-2 w-1/2 border' />
                    </div>
                    <button onClick={handleGoogleLogin}
                        className='btn btn-outline mx-8 mt-7 border-5 text-black text-lg font-medium gap-5 hover:bg-purple-200 hover:border-purple-200 hover:text-black'>
                        <FcGoogle className='text-4xl'></FcGoogle>
                        Sign up with Google</button>
                    <div className='mx-auto mt-8 font-medium'>
                        <p>Don't haven an account? <span><Link to={'/signup'} className='hover:underline text-blue-700 font-medium'>Register here</Link></span> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;