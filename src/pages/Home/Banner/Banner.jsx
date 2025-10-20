import React from 'react';
import { ArrowRight } from 'lucide-react';
import component1 from '../../../assets/images/component-1.png';
import { Link } from 'react-router'

const Banner = () => {
    return (
        <div
            className="w-full bg-no-repeat bg-cover py-20 mb-10 bg-center relative bg-class-card-bg"
        // style={{
        //     backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${bannerImg})`,
        // }}
        >
            <div className='max-w-7xl px-4 mx-auto flex items-center gap-5'>
                {/* text content */}
                <div className=" px-4 md:px-0 max-w-2xl space-y-4 flex-1">
                    {/* Heading */}
                    <h2 className="text-5xl font-bold animate-fadeIn text-gray200">
                        Build Your Perfect <span className="text-main">Body</span>
                    </h2>

                    {/* Description */}
                    <p className="text-lg  text-gray200 animate-fadeIn delay-200">
                        Join our gym and get access to expert trainers, modern equipment, and
                        personalized fitness programs.
                    </p>

                    {/* Button */}
                    <Link to="/classes">
                        <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-main text-white font-semibold rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 animate-fadeIn cursor-pointer">
                            Explore Classes <ArrowRight size={20} />
                        </button>
                    </Link>
                </div>
                {/* image section */}
                <div className='flex-1'>
                    <img src={component1} alt="" className='h-150'/>
                </div>
            </div>
        </div>
    );
};

export default Banner;
