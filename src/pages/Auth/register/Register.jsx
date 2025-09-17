import React, { useState } from "react";
import { motion } from "motion/react"
import Lottie from "lottie-react";
import signupAnimation from "./signUp.json";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import UseAuth from "../../../custom hooks/UseAuth";
import useToast from "../../../custom hooks/useToast";
import useAxiosInstency from "../../../services/Axios/AxiosInstance/AxiosInstency";
import { HeadProvider, Meta, Title } from "react-head";


const Register = () => {
    const [photo, setPhoto] = useState(null);
    const [photoLoading, setPhotoLoading] = useState(false);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);
    const { register, updateUserProfile } = UseAuth();
    const axiosInstency = useAxiosInstency();
    const navigate = useNavigate();
    const { setToastMsg } = useToast();

    console.log(photo)


    const handlePhotoChange = async (e) => {
        try {
            setPhotoLoading(true)
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("image", file);
            console.log(Object.fromEntries(formData));
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=6ab62bb4d9a2890c9cfc80752bf4bb20`, formData
            );
            setPhoto(res.data.data.url);
        } finally {
            setPhotoLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        setError('')
        const form = e.target;
        const formData = Object.fromEntries(new FormData(form));
        if(!photo){
            return setError('Please select a photo')
        }
        try {
            // Step 1: Firebase/Auth register
            await register(formData.email, formData.password);

            // Step 2: Firebase profile update
            await updateUserProfile({
                displayName: formData.displayName,
                photoURL: photo
            });

            // Step 3: Save user to backend
            const res = await axiosInstency.post("/users", {
                email: formData.email,
                role: "member",
                displayName: formData.displayName,
                photoURL: photo,
                created_at: new Date().toISOString(),
            })
            if (res.data?.success) {
                setToastMsg({
                    type: 'success',
                    message: " Register Successfull:"
                })
                form.reset();
                setPhoto(null);
                navigate('/login')
            } else {
                setToastMsg({
                    type: 'error',
                    message: "User Already Exist"
                })
            }

        } catch (error) {
            setToastMsg({
                type: 'error',
                message: " Register failed"
            })
            setError(error.message)
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <HeadProvider>
                <Title>Register | CoreX-Gym</Title>
                <Meta name="description" content="Register of coreX-gym" />
            </HeadProvider>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden"
            >
                {/* Left: Animation */}
                <div className="md:w-1/2 bg-gradient-to-tr from-pink-500 to-purple-600 md:flex items-center justify-center p-6 hidden ">
                    <Lottie animationData={signupAnimation} loop className="w-72 h-72" />
                </div>

                {/* Right: Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Create an Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Photo Upload */}
                        <div className="flex flex-col items-center">
                            <label
                                htmlFor="photo"
                                className="cursor-pointer flex flex-col items-center justify-center border border-gray-300 rounded-xl w-32 h-32 hover:border-indigo-500 transition"
                            >
                                {photoLoading ? <span className="loading loading-spinner text-warning"></span> : photo ? (
                                    <img
                                        src={photo}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">Upload Photo</span>
                                )}
                            </label>
                            <input
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            {/* Name */}
                            <div className="flex items-center border rounded-xl px-3 focus-within:border-indigo-400">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full p-3 outline-none"
                                    required
                                    name="displayName"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex items-center border rounded-xl px-3 focus-within:border-indigo-400">
                                <FaEnvelope className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full p-3 outline-none"
                                    required
                                    name="email"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex items-center border rounded-xl px-3 focus-within:border-indigo-400">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-3 outline-none"
                                    required
                                    name="password"
                                />
                            </div>
                            {error && <p className="text-red-700 font-bold text-[0.8rem] text-center">{error}</p>}
                        </div>
                        {/* login link */}
                        <div className="mb-4 text-[0.8rem] flex gap-1">
                            <span>already have an account?</span>
                            <Link to={'/login'} className="text-blue-800 font-bold">Login</Link>
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner text-warning"></span> : 'Register'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
