import React from 'react';
import useTheme from '../../../custom hooks/useTheme';

const FeaturedCard = ({ card }) => {
    const Icon = card.icon;
    const {theme} = useTheme();
    return (
        <div
            key={card.id}
            className={`flex flex-col items-center p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer ${theme === 'dark' && 'border border-gray-500'}`}
        >
            <div className="p-4 rounded-full bg-yellow-100 mb-4">
                <Icon className="w-10 h-10 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-gray700 text-center mb-2">
                {card.title}
            </h3>
            <p className="text-center">{card.description}</p>
        </div>
    );

    ;
};

export default FeaturedCard;