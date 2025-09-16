import React from "react";
import { useNavigate } from "react-router";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const TrainerCard = ({ trainer }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-yellow-400 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center text-center relative">
      
      {/* Experience Badge */}
      <span className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
        {trainer.experience}+ Yrs
      </span>

      {/* Profile Image */}
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md mb-4">
        <img
          src={
            trainer.photo?.url ||
            "https://via.placeholder.com/150?text=Trainer"
          }
          alt={trainer.fullName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Trainer Info */}
      <h2 className="text-xl font-bold text-gray-800">{trainer.fullName}</h2>
      <p className="text-gray-500 text-sm">{trainer.skills?.join(", ")}</p>

      {/* Available Info */}
      <div className="mt-3 bg-yellow-50 rounded-xl p-3 w-full text-sm">
        <p className="font-semibold text-gray-700">Available:</p>
        <p className="text-gray-600">{trainer.availableDays?.join(", ")}</p>
        <p className="text-gray-600">{trainer.availableTimes?.join(", ")}</p>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 mt-4 text-yellow-500">
        <FaFacebook className="cursor-pointer hover:text-yellow-600" />
        <FaInstagram className="cursor-pointer hover:text-pink-500" />
        <FaTwitter className="cursor-pointer hover:text-sky-500" />
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate(`/trainer/${trainer._id}`)}
        className="mt-5 bg-yellow-400 text-white hover:bg-yellow-500 rounded-xl px-5 py-2 font-semibold transition"
      >
        Know More
      </button>
    </div>
  );
};

export default TrainerCard;

