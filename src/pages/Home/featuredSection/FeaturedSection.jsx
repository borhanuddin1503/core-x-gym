import React from "react";
import featuredCards from "./featuredData";
import FeaturedCard from "./FeaturedCard";

const FeaturedSection = () => {
    return (
        <section className="py-20  rounded-2xl relative px-4 md:px-16" data-aos="zoom-in-up">
            {/* Section Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Why Choose <span className="text-yellow-500">Our Gym</span>
                </h2>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Explore the key features that make our gym the perfect place for
                    your fitness journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredCards.map((card , i) => <FeaturedCard card={card} key={i}></FeaturedCard>)}
            </div>
        </section>
    );
};

export default FeaturedSection;
