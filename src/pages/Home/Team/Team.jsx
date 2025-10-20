import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../shared/Loading/Loading";
import useAxiosInstency from "../../../services/Axios/AxiosInstance/useAxiosInstency";
import { CiViewBoard } from "react-icons/ci";
import { useNavigate } from "react-router";

const Team = () => {
    const axiosInstancy = useAxiosInstency();
    const navigate = useNavigate();

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
        <section className="py-10 px-4 max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">Meet Our <span className="text-main">Trainers</span></h2>
                <p className="">
                    Our expert trainers are here to guide you every step of the way.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trainers?.map((trainer) => (
                    <div
                        key={trainer._id}
                        className="rounded-2xl shadow shadow-main p-6 flex flex-col items-center text-center transform transition relative group/teamCard overflow-hidden"
                        data-aos="fade-up"
                    >
                        <button className="absolute right-0 bg-main text-white top-8 py-2 px-3 rounded-l-2xl">{trainer.experience} yrs+</button>
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
                        <button
                         onClick={() => navigate(`/trainer/${trainer._id}`)}
                         className="bg-root-bg border border-main py-3 px-4 absolute bottom-2 opacity-0 transform translate-y-4 group-hover/teamCard:opacity-100 group-hover/teamCard:translate-y-0 transition duration-500 font-jakarta text-sm  w-10/12 ms-auto rounded-4xl backdrop-blur-2xl font-medium flex items-center justify-center gap-1 text-main cursor-pointer"><CiViewBoard /> Details</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
