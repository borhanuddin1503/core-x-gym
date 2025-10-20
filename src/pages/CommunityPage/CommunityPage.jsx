import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosInstency from "../../services/Axios/AxiosInstance/useAxiosInstency";
import useSecureAxios from "../../services/Axios/SecureAxios/useSecureAxios";
import { toast } from "react-toastify";
import UseAuth from "../../custom hooks/UseAuth";
import { useNavigate } from "react-router";
import Loading from "../../shared/Loading/Loading";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoArrowBack, IoArrowForwardOutline } from "react-icons/io5";


const CommunityPage = () => {
    const { user } = UseAuth();
    const axiosInstancy = useAxiosInstency();
    const secureAxios = useSecureAxios();
    const queryClient = useQueryClient();
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    // query function
    const fetchPosts = async () => {
        const res = await axiosInstancy(`/posts?page=${page}`);
        setTotalPage(res.data.totalPage);
        return res.data.result;
    };
    // Fetch all posts
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ["posts", page],
        queryFn: fetchPosts,
    });

    // Like mutation 
    const likeMutation = useMutation({
        mutationFn: (postId) => secureAxios.patch(`/posts/${postId}/like?email=${user.email}`),
        onSuccess: () => queryClient.invalidateQueries(["posts", page]),
    });

    // Unlike mutation
    const unlikeMutation = useMutation({
        mutationFn: (postId) => secureAxios.patch(`/posts/${postId}/unlike?email=${user.email}`),
        onSuccess: () => queryClient.invalidateQueries(["posts", page]),
    });


    const handleLike = (postId) => {
        if (!user) {
            toast.error("Please login to like this post!");
            return navigate("/login");
        }
        likeMutation.mutate(postId);
    };

    const handleUnlike = (postId) => {
        if (!user) {
            toast.error("Please login to unlike this post!");
            return navigate("/login");
        }
        unlikeMutation.mutate(postId);
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className="max-w-2xl mx-auto my-10 space-y-8 px-3 md:px-8">
            <h2 className="text-3xl font-bold text-center text-main mb-6">
                🌐 Community Posts
            </h2>

            {posts.map((post) => (
                <motion.div
                    key={post._id}
                    className="shadow-lg hover:shadow-2xl transition duration-300 rounded-2xl p-6 border border-gray-100"
                >
                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-main mb-2">{post.title}</h3>

                    {/* Author + Badge */}
                    <p className="text-sm text-gray700 mb-4 flex items-center gap-2">
                        ✍️ <span className="font-medium">{post.authInfo?.authName}</span>
                        <span
                            className={`ml-2 text-xs px-2 py-0.5 rounded-full ${post.authInfo?.role === "admin"
                                ? "bg-blue-500 text-white"
                                : "bg-red-500 text-white"
                                }`}
                        >
                            {post.authInfo?.role}
                        </span>
                    </p>

                    {/* Content */}
                    <p className="text-gray700 leading-relaxed mb-6">{post.content}</p>

                    {/* Voting */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => handleLike(post._id)}
                            disabled={likeMutation.isLoading}
                            className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition"
                        >
                            <FaThumbsUp /> {post.likes?.length || 0}
                        </button>

                        <button
                            onClick={() => handleUnlike(post._id)}
                            disabled={unlikeMutation.isLoading}
                            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition"
                        >
                            <FaThumbsDown /> {post.unLikes?.length || 0}
                        </button>
                    </div>
                </motion.div>
            ))}


            {/* pagination */}
            <div className="text-center flex gap-2 items-center justify-center">
                {/* handlePrevButton  */}
                <button
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-4 py-1 text-xs rounded-4xl text-main font-medium border border-main shadow disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                    disabled={page === 1}
                >
                    <IoArrowBack />
                    prev
                </button>


                {/* manage page click */}
                {
                    Array.from({ length: totalPage }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`w-7 h-7 rounded-full font-medium transition-all text-xs border cursor-pointer ${page === i + 1
                                ? "bg-main border-main shadow-lg text-white"
                                : "border border-main text-main hover:text-white hover:bg-main"
                                }`}
                        >
                            {i + 1}
                        </button>)
                    )
                }


                {/* next button */}
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-1 text-xs rounded-4xl text-main font-medium border border-main shadow disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                    disabled={page === totalPage}
                >
                    Next
                    <IoArrowForwardOutline />

                </button>
            </div>

        </div>
    );
};

export default CommunityPage;
