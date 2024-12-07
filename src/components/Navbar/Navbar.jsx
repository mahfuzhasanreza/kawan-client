import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/kawanLogoMsg.png';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {

    const navigate = useNavigate();
    const { user, signOutUser } = useContext(AuthContext);
    console.log(user);

    const userName = user?.displayName;

    // console.log(user.photoURL);

    const handleSignOutUser = () => {
        signOutUser()
            .then(() => {
                console.log('logout successful');
            })
            .catch(e => console.log('Error', e.message));
    }

    return (
        <div className='w-full bg-purple-600'>
            <div className="flex justify-between px-16 navbar">
                <div>
                    <Link to={'/'}>
                        <img className='w-20' src={logo} alt="" />
                    </Link>
                </div>
                <div className="gap-10">
                    <Link className='hover:text-yellow-300 text-xl text-gray-200'>
                        <p>Home</p>
                    </Link>
                    <Link className='hover:text-yellow-300 text-xl text-gray-200'>
                        <p>Services</p>
                    </Link>
                    <Link className='hover:text-yellow-300 text-xl text-gray-200'>
                        <p>E-Book</p>
                    </Link>

                    {user ? (
                        <div className="flex ml-10">
                            <img
                                onClick={
                                    () => { handleProfileCLick() }
                                }
                                src={user?.photoURL}
                                className="hidden lg:flex h-12 w-12 rounded-full mr-8 my-auto"
                                title={userName}
                            />
                            <button onClick={handleSignOutUser} className="btn text-white btn-outline ml-5">Logout</button>
                        </div>

                    ) : (
                        <div className='space-x-4'>
                            <Link to={'/signin'}>
                                <a className="btn border-2 btn-outline font-extrabold hover:bg-yellow-300 text-yellow-300 hover:text-gray-700 hover:border-yellow-300 rounded-3xl px-7 text-lg">Login</a>
                            </Link>
                            <Link to={'/signup'}>
                                <a className="btn border-2 btn-outline font-extrabold bg-yellow-300 text-gray-700 border-yellow-300 hover:text-yellow-300 hover:bg-transparent hover:border-yellow-300 rounded-3xl px-7 text-lg">Try for free</a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;