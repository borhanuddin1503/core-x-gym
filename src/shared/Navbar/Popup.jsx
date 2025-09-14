import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Mail, User as UserIcon } from "lucide-react";
import defaultAvatar from '../../assets/images/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg';

const Popup = ({ user, handleLogOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative inline-block group"
      ref={popupRef}
      onMouseLeave={() => setIsOpen(false)} // desktop hover effect
    >
      {/* Profile Image */}
      <img
        src={user?.photoURL || defaultAvatar}
        alt="profile"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // mobile click toggle
      />

      {/* Popup Menu */}
      <div
        className={`absolute right-0 top-full  w-64 bg-white shadow-2xl rounded-2xl p-5 text-gray-700 z-50
          transition-all duration-300
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 mt-4
          ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}
      >
        <div className="flex items-center gap-3 border-b pb-4 mb-4">
          <img
            src={user?.photoURL || defaultAvatar}
            alt="profile"
            className="w-12 h-12 rounded-full border"
          />
          <div>
            <p className="flex items-center gap-2 font-semibold text-lg">
              <UserIcon size={18} /> {user?.displayName || "User"}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={16} /> {user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition cursor-pointer"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Popup;
