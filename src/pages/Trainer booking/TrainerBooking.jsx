import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading/Loading";
import useSecureAxios from "../../services/Axios/SecureAxios/useSecureAxios";
import { Link } from "react-router";
import packages from "./Packages";

const TrainerBooking = () => {
    const { id } = useParams();
    const location = useLocation();
    const slot = location.state.slot;
    const secureAxios = useSecureAxios();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    const { data: trainer = {}, isLoading } = useQuery({
        queryKey: ["trainerDetails", id],
        enabled: !!id,
        queryFn: async () => {
            const res = await secureAxios(`/trainers?trainerId=${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const handleJoinNow = () => {
        setErrorMsg('');
        if (!selectedPackage) {
            return setErrorMsg('Please Select a Packages');
        }
        navigate(`/payment/${id}`, { state: { slot, packages: selectedPackage.name, price: selectedPackage.price } });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-10 text-black">
            <h1 className="text-3xl font-bold text-main">Trainer Booking</h1>

            {/* Trainer Info */}
            <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
                <img
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    className="w-24 h-24 rounded-2xl object-cover"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{trainer.fullName}</h2>
                    <p className="text-gray700 mt-1">Selected Slot: {slot.availableTimes}</p>
                </div>
            </div>

            {/* Classes */}
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
                <h3 className="text-xl font-semibold text-main">Class:</h3>
                <ul className="list-none list-inside">
                    <li className="text-gray700] text-main font-bold"><span className=" text-black">Class Name: </span>{slot.className}</li>
                    <li className="text-gray700] text-main font-bold"><span className=" text-black">Available Days: </span>{slot.availableDays?.join(', ')}</li>
                    <li className="text-gray700] text-main font-bold"><span className=" text-black">Available Time: </span>{slot.availableTimes}</li>
                </ul>
            </div>

            {/* Packages */}
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
                <h3 className="text-xl font-semibold text-main">Membership Packages:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {packages.map((pkg, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`cursor-pointer p-4 rounded-xl border ${selectedPackage?.name === pkg.name ? "border-main bg-main/10" : "border-gray-200"
                                } hover:shadow-lg transition`}
                        >
                            <h4 className="font-bold text-lg">{pkg.name}</h4>
                            <ul className="mt-2 text-gray700 list-disc list-inside">
                                {pkg.benefits.map((benefit, i) => (
                                    <li key={i}>{benefit}</li>
                                ))}
                            </ul>
                            <p className="mt-2 font-semibold text-main">Price: ${pkg.price}</p>
                        </div>
                    ))}
                </div>

                {errorMsg && <p className="text-red-400 text-center font-bold">{errorMsg}</p>}
            </div>

            {/* Join Now Button */}
            <div className="text-center">
                <button
                    onClick={handleJoinNow}
                    className="bg-main text-white px-8 py-3 rounded-xl font-semibold hover:bg-main/90 transition cursor-pointer"
                >
                    Join Now
                </button>
            </div>
        </div>
    );
};

export default TrainerBooking;

