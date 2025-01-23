import { Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../assets/kawanLogoMsg.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, signOutUser, theme, setTheme } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isProfileShow, setIsProfileShow] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const userName = user?.displayName;

    const handleSignOutUser = () => {
        signOutUser()
            .then(() => { });
    };

    const profileRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileShow(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`navbar text-white lg:px-10 mx-auto max-w-[5000px] sticky top-0 z-50 backdrop-blur-lg shadow-md
                bg-fuchsia-600 transition-opacity duration-300 ${
                    isScrolled ? "bg-opacity-80" : "bg-opacity-100"
                }`}
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
                        <li><Link className="text-black" to="/e-book">E-Book</Link></li>
                        <li><Link className="text-black" to="/ai-chatbot">Live Counselling</Link></li>
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
            </div>
            <div className="navbar-end w-full">
                <Link to="/">
                    <button className={`hidden lg:flex btn btn-ghost ml-5 ${location.pathname === '/' ? 'text-yellow-300' : ''}`}>Home</button>
                </Link>
                <Link to="/e-book">
                    <button className={`hidden lg:flex btn btn-ghost ml-5 w-full ${location.pathname === '/e-book' ? 'text-yellow-300' : ''}`}>E-Book</button>
                </Link>
                <Link to="/ai-chatbot">
                    <button className={`hidden lg:flex btn btn-ghost ml-5 w-full ${location.pathname === '/ai-chatbot' ? 'text-yellow-300' : ''}`}>Live Counselling</button>
                </Link>
                <Link to={`/health-and-nutrition`}>
                    <button className={`hidden lg:flex btn btn-ghost ml-5 w-full ${location.pathname === '/health-and-nutrition' ? 'text-yellow-300' : ''}`}>Health & Nutrition</button>
                </Link>
                <Link to={`/meditation`}>
                    <button className={`hidden lg:flex btn btn-ghost ml-5 ${location.pathname === '/meditation' ? 'text-yellow-300' : ''}`}>Meditation</button>
                </Link>
                <Link to={`/game/tic-tac`}>
                    <button className={`hidden lg:flex btn btn-ghost ml-5 ${location.pathname === '/game/tic-tac' ? 'text-yellow-300' : ''}`}>TicTacToe</button>
                </Link>
                <Link to={`/game/fifteen-puzzle`}>
                    <button className={`mr-7 hidden lg:flex btn btn-ghost ml-5 ${location.pathname === '/game/fifteen-puzzle' ? 'text-yellow-300' : ''}`}>15 Puzzle</button>
                </Link>
                

                {user ? (
                    <>
                        <>
                            <div className="relative">
                                <img
                                    src={user.photoURL || ""}
                                    ref={profileRef}
                                    className={`${isProfileShow ? 'h-12 w-12 opacity-90 border-2 border-orange-400 rounded-full mr-8 cursor-pointer' : 'h-12 w-12 rounded-full mr-8 cursor-pointer'}`}
                                    alt="User Profile"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    onClick={() => setIsProfileShow(true)}
                                />
                                {/* Show the span only if the image is hovered */}
                                {(isHovered || isProfileShow) && (
                                    <span
                                        className="w-56 z-20 absolute bottom-[-9rem] transform -translate-x-1/2 text-white text-sm bg-black lg:px-2 py-2 rounded-xl opacity-100 transition-opacity duration-300 space-y-2">
                                        <Link to='/profile'>
                                            <div className="ml-3 flex gap-0 items-center">
                                                <img
                                                    src={user.photoURL || ""}
                                                    className="h-8 rounded-full cursor-pointer"
                                                    alt="User Profile"
                                                />
                                                <p className="justify-start hover:bg-gray-600 btn lg:btn-md btn-outline border-none text-white">
                                                    {user.displayName || "Anonymous User"}
                                                </p>
                                            </div>
                                        </Link>
                                        <hr className="w-5/6 border-gray-400 mx-auto" />
                                        <button
                                            onClick={handleSignOutUser}
                                            className="justify-start w-full btn text-white btn-outline border-none hover:bg-gray-600"
                                        >
                                            Logout
                                        </button>
                                    </span>
                                )}
                            </div>

                        </>
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
