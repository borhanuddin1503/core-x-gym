import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import Loading from "../../../shared/Loading/Loading";
import 'swiper/css/pagination';
import {  Pagination, Navigation, Autoplay } from "swiper/modules";

const Reviews = () => {
    const secureAxios = useSecureAxios();

    // 🔹 Fetch reviews with useQuery
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await secureAxios.get("/reviews");
            return res.data;
        },
    });

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="max-w-7xl mx-auto py-10">
            <h2 className="text-3xl font-bold text-center mb-6">What Our <span className="text-main">Members Say</span></h2>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                spaceBetween={30}
                autoplay= {true}
                navigation={true}
                modules={[ Pagination , Navigation , Autoplay]}
                className="mySwiper"
            >
                {reviews.map((r) => (
                    <SwiperSlide key={r._id}>
                        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between h-50">
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={r.user.photoURL}
                                    alt={r.user.displayName}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold">{r.user.displayName}</h3>
                                    <p className="text-sm text-gray-500">{r.trainerName}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic mb-4">"{r.review}"</p>
                            <p className="text-yellow-500">⭐ {r.rating}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;
