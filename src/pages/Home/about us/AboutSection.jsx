import React from "react";
import aboutImg from "../../../assets/images/about.jpg"; // Replace with your gym image
import { Users, Award, Heart } from "lucide-react";
import { Link } from "react-router";


const AboutSection = () => {
    return (
        <section className="py-20 px-4 md:px-16 rounded-2xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg" data-aos="fade-right">
                    <img
                        src={aboutImg}
                        alt="About Gym"
                        className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold">
                        10+ Years of Experience
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-6" data-aos="fade-left">
                    <h2 className="text-4xl font-bold text-black">
                        About <span className="text-main">Our Gym</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Our gym is dedicated to helping individuals achieve their fitness goals
                        with expert trainers, state-of-the-art equipment, and a supportive community.
                        Whether you are a beginner or a professional athlete, we have something
                        for everyone.
                    </p>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2 bg-thin-yellow p-4 rounded-xl shadow hover:shadow-lg transition">
                            <Users className="w-6 h-6 text-main" />
                            <span className="text-gray-700 font-semibold">Community Support</span>
                        </div>
                        <div className="flex items-center gap-2 bg-thin-yellow p-4 rounded-xl shadow hover:shadow-lg transition">
                            <Award className="w-6 h-6 text-main" />
                            <span className="text-gray-700 font-semibold">Certified Trainers</span>
                        </div>
                        <div className="flex items-center gap-2 bg-thin-yellow p-4 rounded-xl shadow hover:shadow-lg transition">
                            <Heart className="w-6 h-6 text-main" />
                            <span className="text-gray-700 font-semibold">Health Tracking</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        to="/classes"
                    >
                        <button
                            className="inline-block mt-6 px-6 py-3 bg-main text-black font-semibold rounded-lg hover:bg-yellow-500 transform hover:scale-102 transition cursor-pointer duration-300 "
                        >
                            Explore Classes
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
