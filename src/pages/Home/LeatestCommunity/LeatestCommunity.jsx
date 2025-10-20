import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import Loading from "../../../shared/Loading/Loading";
import useAxiosInstency from "../../../services/Axios/AxiosInstance/useAxiosInstency";
import { useNavigate } from "react-router";
import useTheme from "../../../custom hooks/useTheme";

const LatestPosts = () => {
    const axiosInstancy = useAxiosInstency();
    const navigate = useNavigate();
    const {theme} = useTheme()
    // React Query fetch function
    const fetchLatestPosts = async () => {
        const res = await axiosInstancy.get("/posts/latest");
        return res.data.posts;
    };

    // useQuery
    const { data: posts = [], isLoading, isError } = useQuery({
        queryKey: ["latestPosts"],
        queryFn: fetchLatestPosts,
    });

    if (isLoading) {
        return (
            <Loading></Loading>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-red-500 py-10">
                Failed to load posts. Try again later.
            </p>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10" data-aos='zoom-in-up'>
            {/* Section Heading */}
            <h2 className="text-3xl font-extrabold text-center text-main mb-10 uppercase tracking-wide">
                🏋️‍♂️ Latest Community Posts
            </h2>

            {/* Grid */}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        onClick={()=>navigate('/community')}
                        className={`group rounded-2xl shadow-xl transition-transform duration-300 cursor-pointer p-6 relative overflow-hidden flex flex-col justify-between ${theme === 'dark'&& 'border border-gray-500'}`}
                    >
                        <div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-main/10 via-transparent to-main/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-main mb-3 group-hover:underline">
                                {post.title}
                            </h3>

                            {/* Short content */}
                            <p className="text-gray200 leading-relaxed mb-5 line-clamp-3">
                                {post.content}
                            </p>
                        </div>

                        <div>
                            {/* Author */}
                            <p className="text-sm text-gray-500 mb-4">
                                ✍️ {post.authInfo?.authName || "Anonymous"} •{" "}
                                <span className="capitalize">{post.authInfo?.role}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Explore all link */}
            <div className="text-center mt-10">
                <a
                    href="/community"
                    className="px-6 py-3 bg-main text-white font-bold rounded-xl shadow-md hover:shadow-xl transition"
                >
                    Explore More Posts
                </a>
            </div>
        </section>
    );
};

export default LatestPosts;
