import { Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../assets/kawanLogoMsg.png';
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userDb, user, signOutUser, theme, setTheme } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isProfileShow, setIsProfileShow] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userType, setUserType] = useState('user');


    const userName = user?.displayName;


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

                    console.log("Verified Professional");
                } else if (data.status === 1) {
                    setUserType('professional');

                    console.log("Unverified ==== Professional");
                } else if (data.status === 0) {
                    setUserType('user');

                    console.log("Regular User");
                }
            } catch (error) {
                console.error("Error fetching professional status:", error);
            }

        };

        checkProfessionalStatus();
    }, [userDb]);

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
                        {
                            userType !== 'professional' && (<li><Link className="text-black" to="/professional-support">User Management</Link></li>)
                        }
                        {
                            userType === 'professional' && (<li><Link className="text-black" to="/user-list">User Management</Link></li>)
                        }
                        <li><Link className="text-black" to="/professional-verification">Professional Verification</Link></li>
                        <li><Link className="text-black" to="/professional-management">Professional Management</Link></li>

                        <li><Link className="text-black" to="/manage-contact">Manage Contact Us Section</Link></li>


                        {/* <li><Link className="text-black" to="/meditation">Meditation</Link></li>
                        <li><Link className="text-black" to="/game/tic-tac">TicTacToe</Link></li>
                        <li><Link className="text-black" to="/game/fifteen-puzzle">15 Puzzle</Link></li>
                        <li><Link className="text-black" to="/game/kawan-puzzle">Kawan Puzzle</Link></li>
                        <li><Link className="text-black" to="/contact-us">Contact Us</Link></li> */}


                    </ul>
                </div>
                <Link to="/">
                    <img className="w-9 lg:w-16 lg:mr-0" src={logo} alt="" />
                </Link>
                <Link to="/" className="hidden lg:block font-semibold text-sm lg:text-xl ml-0 lg:ml-5">Kawan</Link>
            </div>
            <div className="navbar-end lg:w-full gap-2 lg:gap-10">
                <Link to="/">
                    <button className={`hidden lg:flex font-semibold ${location.pathname === '/' ? 'text-yellow-300' : ''}`}>Home</button>
                </Link>

                {
                    userType !== 'professional' && (<Link to="/user-list">
                        <button className={`hidden lg:flex font-semibold   w-full ${location.pathname === '/user-list' ? 'text-yellow-300' : ''}`}>User Management</button>
                    </Link>)
                }
                {
                    userType === 'professional' && (<Link to="/user-list">
                        <button className={`hidden lg:flex font-semibold   w-full ${location.pathname === '/user-list' ? 'text-yellow-300' : ''}`}>User Management</button>
                    </Link>)
                }

                <Link to="/professional-verification">
                    <button className={`hidden lg:flex font-semibold w-full ${location.pathname === '/professional-verification' ? 'text-yellow-300' : ''}`}>Professional Verification</button>
                </Link>

                <Link to={`/professional-management`}>
                    <button className={`hidden lg:flex font-semibold  w-full ${location.pathname === '/professional-management' ? 'text-yellow-300' : ''}`}>Professional Management</button>
                </Link>
                <Link to={`/manage-contact`}>
                    <button className={`hidden lg:flex font-semibold  ${location.pathname === '/manage-contact' ? 'text-yellow-300' : ''}`}>Manage Contact Us Section</button>
                </Link>


                {user ? (
                    <>
                        <>
                            <button onClick={handleSignOutUser}>
                                <a className="px-2 py-1 lg:px-7 lg:py-3 font-semibold border-2 btn-outline bg-yellow-300 text-gray-700 border-yellow-300 hover:text-yellow-300 hover:bg-transparent hover:border-yellow-300 rounded-3xl text-xs sm:text-sm lg:text-lg">
                                    Logout
                                </a>
                            </button>
                        </>
                    </>
                ) : (
                    <div className='flex content-center items-center justify-center space-x-1 lg:space-x-4'>
                        <Link to={'/login'}>
                            <a className="px-2 py-1 lg:px-7 lg:py-3 font-semibold border-2 btn-outline hover:bg-yellow-300 text-yellow-300 hover:text-gray-700 hover:border-yellow-300 rounded-3xl text-xs sm:text-sm lg:text-lg">Login</a>
                        </Link>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;