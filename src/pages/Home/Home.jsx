import React from 'react';
import Banner from './Banner/Banner';
import FeaturedSection from './featuredSection/FeaturedSection';
import AboutSection from './about us/AboutSection';
import { HeadProvider, Meta, Title } from 'react-head';
import FeaturedClasses from './featuredClasses/FeaturedClasses';
import Reviews from './Reviews/Reviews';
import Newsletter from './Newsletter/NewsLetter';
import Team from './Team/Team';
import LatestPosts from './LeatestCommunity/LeatestCommunity';
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
            <FeaturedClasses></FeaturedClasses>
            <Reviews></Reviews>
            <Newsletter></Newsletter>
            <Team></Team>
            <LatestPosts></LatestPosts>
        </div>
    );
};

export default Home;