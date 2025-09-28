import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../shared/Loading/Loading";
import useAxiosInstency from "../../../services/Axios/AxiosInstance/useAxiosInstency";

const Team = () => {
    const axiosInstancy = useAxiosInstency();

    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ['trainerTeam'],
        queryFn: async() => {
            const res = await axiosInstancy('team/trainers');
            return res.data
        }
    })


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className="py-20 px-4 md:px-16 bg-white max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-main mb-2">Meet Our Trainers</h2>
                <p className="text-gray-700">
                    Our expert trainers are here to guide you every step of the way.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trainers?.map((trainer) => (
                    <div
                        key={trainer._id}
                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition"
                        data-aos="fade-up"
                    >
                        <img
                            src={trainer.profileImage}
                            alt={trainer.fullName}
                            className="w-40 h-40 rounded-full object-cover mb-4"
                        />
                        <h3 className="text-xl font-bold text-main mb-2">{trainer.fullName}</h3>
                        <p className="text-gray-700 mb-3">{trainer.bio}</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {trainer.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-main/20 text-main px-3 py-1 rounded-full text-sm font-semibold"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
