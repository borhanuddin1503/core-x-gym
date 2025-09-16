 import { Link, NavLink } from 'react-router';
import useToast from '../../custom hooks/useToast';
import Logo from '../Logo';
import UseAuth from '../../custom hooks/UseAuth';
import Popup from './Popup';
import useNavLinks from '../../custom hooks/useNavLinks';
import { useState } from 'react';

const Navbar = () => {
    const { user, logOut } = UseAuth();
    const { setToastMsg } = useToast();
    const links = useNavLinks();
    const [isOpen , setIsOpen] = useState(false)
    const handleLogOut = () => {
        logOut()
            .then(() => setToastMsg({ type: 'success', message: 'Logout Successful' }))
            .catch(() => setToastMsg({ type: 'error', message: 'Something went wrong' }))
    }

    return (
        <nav className="navbar py-2 justify-between mb-1 rounded-2xl bg-black">
            {/* Left */}
            <div className="sm:navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-medium text-[3rem]">
                        {links.map((link , i) => {
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
                <ul className="menu menu-horizontal px-1 font-medium text-white">
                    {links.map((link , i) => {
                        return <li key={i}><NavLink to={link?.path}>{link?.label}</NavLink></li>
                    })}
                </ul>
            </div>

            {/* Right */}
            <div className="navbar-end flex gap-4 grow relative">
                {user ? (
                    <Popup user={user} handleLogOut={handleLogOut} isOpen={isOpen} setIsOpen={setIsOpen}></Popup>
                ) : (
                    <Link to="/login">
                        <button className="cursor-pointer px-[2rem] py-[1rem] rounded-[12px] text-[1.25rem] font-bold border border-stroke text-white">
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
