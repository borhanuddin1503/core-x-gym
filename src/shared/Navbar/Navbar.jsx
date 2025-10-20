import { Link, NavLink } from 'react-router';
import useToast from '../../custom hooks/useToast';
import Logo from '../Logo';
import UseAuth from '../../custom hooks/UseAuth';
import Popup from './Popup';
import useNavLinks from '../../custom hooks/useNavLinks';
import { useEffect, useState } from 'react';
import useTheme from '../../custom hooks/useTheme';
import { IoLogInOutline } from "react-icons/io5";
import ThemeController from './ThemeController';

const Navbar = () => {
    const { user, logOut } = UseAuth();
    const { setToastMsg } = useToast();
    const links = useNavLinks();
    const [isOpen, setIsOpen] = useState(false);
    const {theme } = useTheme();
    

    const handleLogOut = () => {
        logOut()
            .then(() => setToastMsg({ type: 'success', message: 'Logout Successful' }))
            .catch(() => setToastMsg({ type: 'error', message: 'Something went wrong' }))
    }


    return (
        <nav className={`navbar py-3 justify-between mb-1 bg-gray700 sticky top-0 z-50 bg-root-bg shadow-lg ${theme==='dark' && 'border-b border-b-gray-600'}`}>
            {/* Left */}
            <div className="sm:navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="var(--thin-black)">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content bg-root-bg rounded-box z-1 mt-3 w-52 p-2 shadow font-medium text-[3rem] ${theme==='dark'&&'border border-gray-500'}`}>
                        {links.map((link, i) => {
                            return <li key={i}><NavLink to={link?.path}>{link?.label}</NavLink></li>
                        })}
                    </ul>
                </div>
                <div className='hidden lg:block'>
                    <Logo />
                </div>
            </div>

            {/* Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium ">
                    {links.map((link, i) => {
                        return <li key={i} className='font-medium hover:text-main'><NavLink to={link?.path}>{link?.label}</NavLink></li>
                    })}
                </ul>
            </div>

            {/* Right */}
            <div className="navbar-end flex gap-4 grow relative">
                <ThemeController></ThemeController>
                {user ? (
                    <Popup user={user} handleLogOut={handleLogOut} isOpen={isOpen} setIsOpen={setIsOpen}></Popup>
                ) : (
                    <Link to="/login">
                        <button className="cursor-pointer py-2 px-6 rounded-lg font-bold border border-main hover:bg-transparent hover:text-main transition duration-300 flex gap-1 items-center text-white bg-main">
                            <IoLogInOutline />
                            <span>Sign In</span>
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
