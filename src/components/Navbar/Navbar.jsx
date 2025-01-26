import { Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../assets/kawanLogoMsg.png';
import { FaChevronDown } from 'react-icons/fa';

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
                bg-fuchsia-600 transition-opacity duration-300 ${isScrolled ? "bg-opacity-80" : "bg-opacity-100"
                }`}
        >
            <Toaster />
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="font-semibold lg:hidden mx-1 lg:mx-3">
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
                        <li><Link className="text-black" to="/professional-support">Professionals Support</Link></li>

                        <li><Link className="text-black" to="/health-and-nutrition">Health & Nutrition</Link></li>
                        <li><Link className="text-black" to="/meditation">Meditation</Link></li>
                        <li><Link className="text-black" to="/game/tic-tac">TicTacToe</Link></li>
                        <li><Link className="text-black" to="/game/fifteen-puzzle">15 Puzzle</Link></li>
                        <li><Link className="text-black" to="/game/kawan-puzzle">Kawan Puzzle</Link></li>
                        <li><Link className="text-black" to="/contact-us">Contact Us</Link></li>
                    </ul>
                </div>
                <Link to="/">
                    <img className="w-9 lg:w-16 lg:mr-0" src={logo} alt="" />
                </Link>
                <Link to="/" className="hidden lg:block font-semibold text-sm lg:text-xl ml-0 lg:ml-5">Kawan</Link>
            </div>
            <div className="navbar-end lg:w-full gap-2 lg:gap-7">
                <Link to="/">
                    <button className={`hidden lg:flex font-semibold ${location.pathname === '/' ? 'text-yellow-300' : ''}`}>Home</button>
                </Link>
                <Link to="/e-book">
                    <button className={`hidden lg:flex font-semibold w-full ${location.pathname === '/e-book' ? 'text-yellow-300' : ''}`}>E-Book</button>
                </Link>
                <Link to="/professional-support">
                    <button className={`hidden lg:flex font-semibold   w-full ${location.pathname === '/professional-support' ? 'text-yellow-300' : ''}`}>Professionals Support</button>
                </Link>
                <Link to={`/health-and-nutrition`}>
                    <button className={`hidden lg:flex font-semibold  w-full ${location.pathname === '/health-and-nutrition' ? 'text-yellow-300' : ''}`}>Health & Nutrition</button>
                </Link>
                <Link to={`/meditation`}>
                    <button className={`hidden lg:flex font-semibold  ${location.pathname === '/meditation' ? 'text-yellow-300' : ''}`}>Meditation</button>
                </Link>


                {/* Game  */}
                <div className="hidden lg:flex relative dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        role="button"
                        className="flex items-center font-semibold bg-none cursor-pointer"
                    >
                        Game
                        <FaChevronDown
                            className="ml-2 transition-transform duration-300 ease-in-out dropdown-toggle"
                        />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-gray-500 text-white rounded-box z-[1] p-2 w-40 content-center shadow"
                    >
                        <li>
                            <Link to={`/game/tic-tac`}>
                                <a className={`hidden text-md font-bold lg:flex ${location.pathname === '/game/tic-tac' ? 'text-yellow-300' : ''}`}>TicTacToe</a>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/game/fifteen-puzzle`}>
                                <a className={`hidden lg:flex text-md font-bold ${location.pathname === '/game/fifteen-puzzle' ? 'text-yellow-300' : ''}`}>15 Puzzle</a>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/game/kawan-puzzle`}>
                                <a className={`hidden lg:flex text-md font-bold ${location.pathname === '/game/kawan-puzzle' ? 'text-yellow-300' : ''}`}>Kawan Puzzle</a>
                            </Link>
                        </li>
                    </ul>

                    {/* Styles */}
                    <style>{`
        .dropdown:hover .dropdown-toggle {
          transform: rotate(-180deg);
        }
      `}</style>
                </div>

                {/* Game end */}

                {/* COntact us */}
                <div>

                    <Link to={`/contact-us`}>
                        <a className={`hidden lg:flex text-md font-bold ${location.pathname === '/contact-us' ? 'text-yellow-300' : ''}`}>Contact Us</a>
                    </Link>
                </div>




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
                    <div className='flex content-center items-center justify-center space-x-1 lg:space-x-4'>
                        <Link to={'/login'}>
                            <a className="px-2 py-1 lg:px-7 lg:py-3 font-semibold border-2 btn-outline hover:bg-yellow-300 text-yellow-300 hover:text-gray-700 hover:border-yellow-300 rounded-3xl text-xs sm:text-sm lg:text-lg">Login</a>
                        </Link>
                        <Link to={'/register'}>
                            <a className="px-2 py-1 lg:px-7 lg:py-3 font-semibold border-2 btn-outline bg-yellow-300 text-gray-700 border-yellow-300 hover:text-yellow-300 hover:bg-transparent hover:border-yellow-300 rounded-3xl text-xs sm:text-sm lg:text-lg">
                                Register
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
