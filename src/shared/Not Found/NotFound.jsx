import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-extrabold text-main mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">
        Oops! Page not found.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-main text-white px-6 py-3 rounded-xl font-semibold hover:bg-main/90 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
