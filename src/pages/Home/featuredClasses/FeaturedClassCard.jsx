import React from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { Link } from 'react-router'

export default function FeaturedClassCard({ cls }) {
  return (
    <div className='group relative shadow-lg border border-gray-300 rounded-xl overflow-hidden'>

      {/* booking count label */}
      <p className="rounded-l-4xl absolute top-6 right-0 text-gray700 text-xs opacity0 leading-relaxed mb-6 font-bold py-2 px-3 transform translate-x-50 group-hover:translate-x-0 group-hover:opacity-100 bg-main text-white transition duration-500">{cls.bookings?.length || 0}  booked</p>

      {/* card image */}
      <div className='flex p-5 bg-class-card-bg  h-25 items-center justify-center rounded-t-xl'>
        <img src={cls.image} alt={cls.name} className='max-w-3/4 max-h-5/6 '/>
      </div>

      {/* text content */}
      <div className='px-5 pb-5'>

        <h2 className='text-lg pt-5 text-center'>{cls.name}</h2>

        {/* Trainers List */}
        <div>
          {/* Trainers Label */}
          <h4 className="font-semibold mb-2 flex text-sm items-center gap-2  justify-center mt-2">
            <Users className="w-4 h-4 text-[#22d3ee]" /> Trainers
          </h4>

          {cls.trainers.length > 0 ?
            <div className="flex flex-wrap gap-2 justify-center">
              {cls.trainers.slice(0, 3).map((trainer) => (
                <Link
                  to={`/trainer/${trainer._id}`}
                  key={trainer._id}
                  className="text-center group"
                >
                  <div className='flex gap-2 items-center group/trainer'>
                    <p className="text-xs group-hover/trainer:text-[#facc15] py-1 px-2 rounded-sm border border-main">
                      {trainer.fullName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>:
            <p className='text-xs text-gray-500 text-center'>No Trainer</p>  
        }
        </div>
      </div>
    </div>
  )
}
