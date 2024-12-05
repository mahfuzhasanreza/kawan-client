import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/kawanLogoMsg.png';

const Navbar = () => {
    return (
        <div className='w-full bg-purple-500'>
            <div className="flex justify-between px-16 navbar">
            <div>
                <Link to={'/'}>
                    <img className='w-20' src={logo} alt="" />
                </Link>
            </div>
            <div className="gap-10">
                <Link className='text-xl text-gray-200'>
                    <p>Home</p>
                </Link>
                <Link className='text-xl text-gray-200'>
                    <p>Services</p>
                </Link>
                <Link className='text-xl text-gray-200'>
                    <p>E-Book</p>
                </Link>
                <div className='space-x-4'>
                    <Link to={'/signin'}>
                        <a className="btn border-2 btn-outline font-extrabold hover:bg-yellow-300 text-yellow-300 hover:text-gray-700 hover:border-yellow-300 rounded-3xl px-7 text-lg">Login</a>
                    </Link>
                    <Link to={'/signup'}>
                        <a className="btn border-2 btn-outline font-extrabold bg-yellow-300 text-gray-700 border-yellow-300 hover:text-yellow-300 hover:bg-transparent hover:border-yellow-300 rounded-3xl px-7 text-lg">Try for free</a>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Navbar;