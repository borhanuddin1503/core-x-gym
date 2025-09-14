// src/data/featuredCards.js
import { Dumbbell, Heart, Users, Clock } from "lucide-react";

const featuredCards = [
    {
        id: 1,
        title: "Expert Trainers",
        description: "Work with certified trainers to achieve your fitness goals faster.",
        icon: Dumbbell,
        bgColor: "bg-yellow-400/20",
    },
    {
        id: 2,
        title: "24/7 Access",
        description: "Workout anytime with our round-the-clock gym facilities.",
        icon: Clock,
        bgColor: "bg-yellow-400/20",
    },
    {
        id: 3,
        title: "Community Support",
        description: "Join a community of like-minded fitness enthusiasts.",
        icon: Users,
        bgColor: "bg-yellow-400/20",
    },
    {
        id: 4,
        title: "Health Tracking",
        description: "Track your progress and stay motivated with our tools.",
        icon: Heart,
        bgColor: "bg-yellow-400/20",
    },
];

export default featuredCards;
