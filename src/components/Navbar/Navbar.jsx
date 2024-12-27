import { Link, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../assets/kawanLogoMsg.png';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, signOutUser, theme, setTheme } = useContext(AuthContext);

    const userName = user?.displayName;

    const handleSignOutUser = () => {
        signOutUser()
            .then(() => { });
    };

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div
            className={`navbar bg-fuchsia-600 text-white lg:px-10 mx-auto max-w-[5000px] 
                        sticky top-0 z-50 backdrop-blur-lg bg-opacity-100 shadow-md`}
        >
            <Toaster />
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li><Link className="text-black" to="/">Home</Link></li>
                        {
                            user ?
                                <></>
                                : (<li><Link className="md:hidden text-black" to="/register">Register</Link></li>)
                        }
                    </ul>
                </div>
                <Link to="/">
                    <img className="hidden md:flex w-16" src={logo} alt="" />
                </Link>
                <Link to="/" className="btn btn-ghost text-sm md:text-xl ml-0 lg:ml-5">Kawan</Link>
                <Link to="/">
                    <button className="hidden lg:flex btn btn-ghost ml-5">Home</button>
                </Link>
            </div>
            <div className="navbar-end w-full">
                <Link to="/e-book">
                    <button className="hidden lg:flex btn btn-ghost ml-5 w-full">E-Book</button>
                </Link>
                <Link to="/">
                    <button className="hidden lg:flex btn btn-ghost ml-5 w-full">AI ChatBot</button>
                </Link>
                <Link to={`/`}>
                    <button className="hidden lg:flex btn btn-ghost ml-5 w-full">SelfDev Resources</button>
                </Link>
                <Link to={`/`}>
                    <button className="mr-5 hidden lg:flex btn btn-ghost ml-5">Meditation</button>
                </Link>

                {user ? (
                    <>
                        <div>
                            <Link to='/profile'>
                                <img
                                    src={user.photoURL || ""}
                                    className="h-12 w-12 rounded-full mr-8 cursor-pointer"
                                    alt="User Profile"
                                />
                            </Link>
                        </div>
                        <button
                            onClick={handleSignOutUser}
                            className="ml-2 btn text-white btn-outline"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className='space-x-4'>
                        <Link to={'/login'}>
                            <a className="btn border-2 btn-outline hover:bg-yellow-300 text-yellow-300 hover:text-gray-700 hover:border-yellow-300 rounded-3xl px-7 text-lg">Login</a>
                        </Link>
                        <Link to={'/register'}>
                            <a className="btn border-2 btn-outline bg-yellow-300 text-gray-700 border-yellow-300 hover:text-yellow-300 hover:bg-transparent hover:border-yellow-300 rounded-3xl px-7 text-lg">Register</a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
