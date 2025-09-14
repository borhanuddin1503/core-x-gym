import React from 'react';

const FeaturedCard = ({ card }) => {
    const Icon = card.icon;
    return (
        <div
            key={card.id}
            className={`flex flex-col items-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer`}
        >
            <div className="p-4 rounded-full bg-yellow-100 mb-4">
                <Icon className="w-10 h-10 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {card.title}
            </h3>
            <p className="text-gray-600 text-center">{card.description}</p>
        </div>
    );

    ;
};

export default FeaturedCard;