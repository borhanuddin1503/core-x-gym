import { Dumbbell, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import defaultAvatar from '../../assets/images/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg'

const ClassCard = ({ cls }) => {
  return (
    <div
      key={cls.id}
      className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border border-gray-200"
    >

      <img src={cls.image} alt="class image" className='w-full h-50 object-contain' />

      {/* Title */}
      <h3 className="text-2xl font-bold text-main my-3 flex items-center gap-2">
        <Dumbbell className="w-5 h-5 text-[#22d3ee]" />
        {cls.name}
      </h3>

      {/* Description */}
      <p className="text-gray-700  leading-relaxed mb-6">{cls.description}</p>

      {/* Trainers Label */}
      <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
        <Users className="w-4 h-4 text-[#22d3ee]" /> Trainers:
      </h4>

      {/* Trainers List */}
      <div className="flex flex-wrap gap-4">
        {cls.trainers.slice(0, 5).map((trainer) => (
          <Link
            to={`/trainer/${trainer._id}`}
            key={trainer.id}
            className="text-center group"
          >
            <div className='flex flex-col gap-2 items-center'>
              <img
                src={trainer.profileImage || defaultAvatar}
                alt={trainer.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 group-hover:border-[#facc15] transition-all duration-300"
              />
              <p className="text-xs text-black group-hover:text-[#facc15]">
                {trainer.fullName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassCard;
