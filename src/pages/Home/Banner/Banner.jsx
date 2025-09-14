import React from 'react';
import { ArrowRight } from 'lucide-react';
import bannerImg from '../../../assets/images/banner.jpg';
import { Link } from 'react-router'

const Banner = () => {
    return (
        <div
            className="w-full bg-no-repeat bg-cover min-h-[calc(100vh-80px)] rounded-2xl bg-center relative flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${bannerImg})`,
            }}
        >
            {/* Overlay content */}
            <div className="text-center text-white px-4 md:px-0 max-w-2xl space-y-4">
                {/* Heading */}
                <h2 className="text-5xl font-bold animate-fadeIn">
                    Build Your Perfect <span className="text-main">Body</span>
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray200 animate-fadeIn delay-200">
                    Join our gym and get access to expert trainers, modern equipment, and
                    personalized fitness programs.
                </p>

                {/* Button */}
                <Link to="/classes">
                    <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-main text-black font-semibold rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 animate-fadeIn cursor-pointer">
                        Explore Classes <ArrowRight size={20} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Banner;
