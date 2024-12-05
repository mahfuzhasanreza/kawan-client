import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="px-5 navbar w-full bg-blue-300">
            <div className="navbar-start">
                <Link to={'/'}>
                    <a className="btn btn-ghost text-xl">KAWAN</a>
                </Link>
            </div>
            <div className="navbar-end gap-4">
                <Link to={'/signin'}>
                    <a className="btn">Login</a>
                </Link>
                <Link to={'/signup'}>
                    <a className="btn">Register</a>
                </Link>
            </div>
        </div>
    );
};

export default Header;