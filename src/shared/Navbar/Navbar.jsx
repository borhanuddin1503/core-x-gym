import { Link, NavLink } from "react-router";
import useToast from "../../custom hooks/useToast";
import Logo from "../Logo";
import UseAuth from "../../custom hooks/UseAuth";
import Popup from "./Popup";
import useNavLinks from "../../custom hooks/useNavLinks";
import { useState } from "react";
import useTheme from "../../custom hooks/useTheme";
import { IoLogInOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeController from "./ThemeController";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const { setToastMsg } = useToast();
  const links = useNavLinks();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const handleLogOut = () => {
    logOut()
      .then(() => setToastMsg({ type: "success", message: "Logout Successful" }))
      .catch(() =>
        setToastMsg({ type: "error", message: "Something went wrong" })
      );
  };

  return (
    <nav
      className={`navbar py-3 justify-between mb-1 sticky top-0 z-50 bg-root-bg shadow-lg ${
        theme === "dark" && "border-b border-b-gray-600"
      }`}
    >
      {/* ---------- LEFT ---------- */}
      <div className="sm:navbar-start flex items-center gap-2">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="btn btn-ghost lg:hidden"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="hidden lg:block">
          <Logo />
        </div>
      </div>

      {/* ---------- CENTER (Desktop menu) ---------- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          {links.map((link, i) => (
            <li key={i} className="font-medium hover:text-main">
              <NavLink to={link?.path}>{link?.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- RIGHT ---------- */}
      <div className="navbar-end flex gap-4 grow relative">
        <ThemeController />
        {user ? (
          <Popup
            user={user}
            handleLogOut={handleLogOut}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ) : (
          <Link to="/login">
            <button className="cursor-pointer py-2 px-6 rounded-lg font-bold border border-main hover:bg-transparent hover:text-main transition duration-300 flex gap-1 items-center text-white bg-main">
              <IoLogInOutline />
              <span>Sign In</span>
            </button>
          </Link>
        )}
      </div>

      {/* ---------- MOBILE SLIDE MENU ---------- */}
      <div
        className={`fixed  inset-0 z-[999] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div
        className={`absolute top-full left-0 backdrop-blur-2xl w-80 bg-transparent shadow-lg z-[1000] transform transition-transform duration-300 rounded-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } ${theme === "dark" && "border-r border-gray-600"}`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <Logo />
          <button onClick={() => setIsMenuOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>
        {/* Mobile nav links */}
        <ul className="menu p-4 font-medium space-y-1">
          {links.map((link, i) => (
            <li key={i}>
              <NavLink
                to={link?.path}
                className="hover:text-main"
                onClick={() => setIsMenuOpen(false)}
              >
                {link?.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
