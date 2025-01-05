import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import Lottie from "lottie-react";
import registerLottieData from '../../assets/lottie/register.json';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signInUser, createUser, signInWithGoogle } = useContext(AuthContext);


    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [newPasswordValue, setNewPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.photo.value;


        // console.log(email, password, name, photo);

        // reset error and status
        setErrorMessage('');


        if (password.length < 6) {
            setErrorMessage('Password should be 6 character or longer');
            toast.error(errorMessage);
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).+$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase, one lowercase');
            toast.error(errorMessage);
            return;
        }


        createUser(email, password)
            .then(result => {
                // console.log(result.user);

                event.target.reset();
                navigate('/');


                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(auth.currentUser, profile)
                    .then(() => {


                    })

                // signInUser(email, password);
                // event.target.reset();
                // navigate('/');
                logInUser(email, password);


            })
            .catch(error => {
                setErrorMessage(error.message);
                toast.error(errorMessage);
            })

    }

    const logInUser = async (email, password) => {
        try {
            const result = await signInUser(email, password);
            navigate(location?.state ? location.state : '/');
        } catch (error) {
            //  console.error('Sign in error:', error.message);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            navigate(location?.state ? location.state : '/');
        } catch (error) {
            // console.error('Google login error:', error.message);

        }
    };

    return (
        <div className="mx-auto mb-24">
            <Helmet>
                <title>Register | Kawan</title>
            </Helmet>

            <ToastContainer />


            <div className="w-10/12 lg:flex mx-auto mt-20">

                <div className="mx-auto w-2/5">
                    <Lottie animationData={registerLottieData}></Lottie>
                </div>


                <div className="bg-white shadow-lg p-5 rounded-2xl mt-10 mb-10 card w-1/2 max-w-xl shrink-0 content-center mx-auto">
                    <h2 className='text-4xl  mb-5 mx-auto text-black'>Create a new account !</h2>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className='grid lg:grid-cols-2 gap-3 mb-5'>
                            {/* First Name  */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="first-name"
                                    placeholder=" "
                                    name='name'
                                    value={firstNameValue}
                                    onChange={(e) => setFirstNameValue(e.target.value)}
                                    className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 pb-2 ${firstNameValue
                                        ? 'border-fuchsia-400'
                                        : ''
                                        }`}
                                    required
                                />
                                <label
                                    htmlFor="text"
                                    className={`absolute left-3 transition-all duration-200 ease-in-out ${firstNameValue
                                        ? 'top-1 text-xs text-fuchsia-500'
                                        : 'top-3 text-base text-gray-400'
                                        } peer-focus:top-1 peer-focus:text-xs peer-focus:text-fuchsia-500`}
                                >
                                    First Name
                                </label>
                            </div>

                            {/* Last Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="last-name"
                                    name='lastName'
                                    placeholder=" "
                                    value={lastNameValue}
                                    onChange={(e) => setLastNameValue(e.target.value)}
                                    className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 pb-2 ${lastNameValue
                                        ? 'border-fuchsia-400'
                                        : ''
                                        }`}
                                    required
                                />
                                <label
                                    htmlFor="text"
                                    className={`absolute left-3 transition-all duration-200 ease-in-out ${lastNameValue
                                        ? 'top-1 text-xs text-fuchsia-500'
                                        : 'top-3 text-base text-gray-400'
                                        } peer-focus:top-1 peer-focus:text-xs peer-focus:text-fuchsia-500`}
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
                                name='email'
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
                                value={newPasswordValue}
                                onChange={(e) => setNewPasswordValue(e.target.value)}
                                className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 pb-2 ${newPasswordValue ? 'border-fuchsia-400' : ''
                                    }`}
                                required
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-3 transition-all duration-200 ease-in-out ${newPasswordValue
                                    ? 'top-1 text-xs text-fuchsia-500'
                                    : 'top-3 text-base text-gray-400'
                                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-fuchsia-500`}
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
                                id="confirm-password"
                                placeholder=" "
                                value={confirmPasswordValue}
                                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                                className={`peer input input-bordered w-full h-12 px-3 pt-6 text-gray-700 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 pb-2 ${confirmPasswordValue ? 'border-fuchsia-400' : ''
                                    }`}
                                required
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-3 transition-all duration-200 ease-in-out ${confirmPasswordValue
                                    ? 'top-1 text-xs text-fuchsia-500'
                                    : 'top-3 text-base text-gray-400'
                                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-fuchsia-500`}
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
                            <button className="btn btn-primary bg-fuchsia-600 text-white  text-lg border-none hover:bg-fuchsia-900">Sign up</button>
                        </div>
                    </form>
                    <div className='flex items-center'>
                        <hr className='ml-10 mr-2 w-1/2 border' />
                        <p className='text-gray-500'>Or</p>
                        <hr className='mr-10 ml-2 w-1/2 border' />
                    </div>
                    <button
                        onClick={handleGoogleLogin}
                        className='btn btn-outline mx-8 mt-7 border-5 text-black text-lg font-medium gap-5 hover:bg-fuchsia-200 hover:border-fuchsia-200 hover:text-black'>
                        <FcGoogle className='text-4xl'></FcGoogle>
                        Sign up with Google
                    </button>
                    <div className='mx-auto mt-8 font-medium'>
                        <p>Don't haven an account? <span><Link to={'/login'} className='hover:underline text-fuchsia-700 font-medium'>Login here</Link></span> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;