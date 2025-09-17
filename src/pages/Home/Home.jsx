import React from 'react';
import Banner from './Banner/Banner';
import FeaturedSection from './featuredSection/FeaturedSection';
import AboutSection from './about us/AboutSection';
import { HeadProvider, Meta, Title } from 'react-head';
const Home = () => {
    return (
        <div>
            <HeadProvider>
                <Title>Home | CoreX-Gym</Title>
                <Meta name="description" content="This is the Home Page of CoreX-Gym" />
            </HeadProvider>

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