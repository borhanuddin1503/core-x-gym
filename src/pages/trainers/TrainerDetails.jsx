import React from "react";
import { Calendar, User, Dumbbell, Phone, Mail } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { HeadProvider, Meta, Title } from "react-head";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstency from "../../services/Axios/AxiosInstance/AxiosInstency";
import Loading from "../../shared/Loading/Loading";
import Swal from "sweetalert2";
import NotFound from "../../shared/Not Found/NotFound";

const TrainerDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosInstency = useAxiosInstency();

    const {
        data: trainer = {},
        isLoading,
        error,
    } = useQuery({
        queryKey: ["trainerDetails", id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosInstency(`/trainers?trainerId=${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    if (error) {
       return <NotFound></NotFound>
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10">
            {/* SEO */}
            <HeadProvider>
                <Title>Trainer Details | CoreX-Gym</Title>
                <Meta
                    name="description"
                    content="This is the Trainers Details Page of CoreX-Gym"
                />
            </HeadProvider>

            {/* Be a Trainer Section */}
            <div className="bg-main text-white rounded-2xl shadow-xl p-8 text-center space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                    Want to inspire others?
                </h2>
                <p className="text-white/80 max-w-xl mx-auto">
                    Join our team of professional trainers and help people transform their
                    lives with fitness and dedication.
                </p>
                <button
                    onClick={() => navigate("/be-a-trainer")}
                    className="bg-white text-main px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition"
                >
                    Become a Trainer
                </button>
            </div>

            {!trainer ? (
                <p className="bg-red-400">No Trainers Found</p>
            ) : (
                // Two-column layout
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Trainer Info */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
                        <div className="flex items-center gap-6">
                            <img
                                src={trainer.profileImage}
                                alt={trainer.fullName}
                                className="w-32 h-32 rounded-2xl object-cover shadow-md"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-main flex items-center gap-2">
                                    <User className="w-6 h-6" /> {trainer.fullName}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    Age: {trainer.age} | Experience: {trainer.experience} years
                                </p>
                                <div className="flex flex-col text-gray-600 mt-2">
                                    <span className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-main" /> {trainer.phone}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-main" /> {trainer.email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-main flex items-center gap-2">
                                <Dumbbell className="w-5 h-5" /> Expertise
                            </h3>
                            <ul className="mt-2 flex flex-wrap gap-2">
                                {trainer.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 text-sm bg-main/10 text-main font-medium rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Available Slots */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
                        <h3 className="text-xl font-bold text-main flex items-center gap-2">
                            <Calendar className="w-6 h-6" /> Available Slots
                        </h3>

                        <div>
                            <p className="font-medium text-gray700">Days:</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {trainer.availableDays.map((day, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 text-sm bg-main/10 text-main font-medium rounded-full"
                                    >
                                        {day}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="font-medium text-gray700">Times:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                                {trainer.availableTimes.map((time, idx) => (
                                    <button
                                        key={idx}
                                        className="border border-main text-main px-4 py-2 rounded-lg font-medium hover:bg-main hover:text-white transition cursor-pointer"
                                        onClick={() => navigate(`/book/${trainer._id}` , {state:{time: time}})}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerDetails;
