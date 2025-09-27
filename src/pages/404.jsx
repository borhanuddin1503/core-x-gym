import React from "react";
import { Link } from "react-router";
import { FaSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white px-4">
      
      {/* 404 Number */}
      <h1 className="text-[10rem] font-extrabold text-main drop-shadow-lg">404</h1>

      {/* Icon */}
      <FaSadTear className="text-6xl text-red-500 my-4 animate-bounce" />

      {/* Message */}
      <p className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Oops! Page not found
      </p>
      <p className="text-center text-gray-300 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-main text-black font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
