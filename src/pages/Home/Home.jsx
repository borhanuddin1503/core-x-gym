import React from 'react';
import Banner from './Banner/Banner';
import FeaturedSection from './featuredSection/FeaturedSection';
import AboutSection from './about us/AboutSection';
const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <AboutSection></AboutSection>

            {/* todo
            1. featred class
            2.reviews
            3.
            */}
        </div>
    );
};

export default Home;