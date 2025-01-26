import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import loginLottieData from '../../assets/lottie/login.json';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const emailRef = useRef();

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        // Reset status
        setSuccess(false);


        try {
            const result = await signInUser(email, password);
            // console.log(result.user);
            setSuccess(true);
            e.target.reset();
            navigate(location?.state ? location.state : '/');
            
        } catch (error) {
            // toast.error('Email and Password does not match'); // Trigger toast notification
        }
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        navigate('/forget-password', { state: { inputEmail: email } });
    };


    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            // console.log(result.user);
            navigate(location?.state ? location.state : '/');
        } catch (error) {
            //  console.error('Google login error:', error.message);
        }
    };

    return (
        <div className="mx-auto pb-20 bg-fuchsia-50">
            <Helmet>
                <title>Login | Kawan</title>
            </Helmet>

            <ToastContainer />
            <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row items-center lg:w-10/12 mx-auto content-center justify-center">
                <div className="mx-auto w-3/5 lg:w-1/3">
                    <Lottie animationData={loginLottieData}></Lottie>
                </div>
                <div className="lg:flex h-fit w-fit bg-white border-gray border px-11 py-0 rounded-2xl mx-auto mt-4 lg:mt-20">


                    <div className="mt-10 mb-10 card max-w-xl shrink-0 content-center mx-auto">
                        <h2 className='text-4xl  mb-5 mx-auto text-black'>Welcome Back !</h2>
                        <form onSubmit={handleLogin}
                            className="card-body">
                            {/* Email  */}
                            <div className="relative">
                                <input
                                    type="email"
                                    name='email'
                                    ref={emailRef}
                                    placeholder=" "
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 pb-2 ${emailValue
                                        ? 'border-fuchsia-400'
                                        : ''
                                        }`}
                                    required
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-3 transition-all duration-200 ease-in-out ${emailValue
                                        ? 'top-1 text-xs text-fuchsia-500'
                                        : 'top-3 text-base text-gray-400'
                                        } peer-focus:top-1 peer-focus:text-xs peer-focus:text-fuchsia-500`}
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
                                    name='password'
                                    placeholder=" "
                                    value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                    className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 pb-2 ${passwordValue ? 'border-fuchsia-400' : ''
                                        }`}
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute left-3 transition-all duration-200 ease-in-out ${passwordValue
                                        ? 'top-1 text-xs text-fuchsia-500'
                                        : 'top-3 text-base text-gray-400'
                                        } peer-focus:top-1 peer-focus:text-xs peer-focus:text-fuchsia-500`}
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
                                <a href="#" className="label-text-alt link link-hover hover:text-fuchsia-700 text-black hover:no-underline">Forgotten password?</a>
                            </label>

                            <div className="form-control mt-2">
                                <button className="btn btn-primary bg-fuchsia-700 text-white text-lg border-none hover:bg-fuchsia-900">Login</button>
                            </div>
                        </form>

                        {success && <p className="text-green-500 text-center mt-4">Login successful!</p>}

                        <div className='flex items-center'>
                            <hr className='ml-10 mr-2 w-1/2 border' />
                            <p className='text-gray-500'>Or</p>
                            <hr className='mr-10 ml-2 w-1/2 border' />
                        </div>
                        <button onClick={handleGoogleLogin}
                            className='btn btn-outline bg-purple-100 mx-8 mt-7 border-5 text-black text-lg font-medium gap-5 hover:bg-fuchsia-200 hover:border-fuchsia-200 hover:text-black'>
                            <FcGoogle className='text-4xl'></FcGoogle>
                            Sign In with Google</button>
                        <div className='mx-auto mt-8 font-medium'>
                            <p>Don't haven an account? <span><Link to={'/register'} className='hover:underline text-fuchsia-700 font-medium'>Register here</Link></span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
