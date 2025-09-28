import React, { useState } from "react";
import { motion } from "motion/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import UseAuth from "../../../custom hooks/UseAuth";
import useToast from "../../../custom hooks/useToast";
import loginImg from '../../../assets/images/login.svg'
import { HeadProvider, Meta, Title } from "react-head";
import { FcGoogle } from "react-icons/fc"
import useAxiosInstency from "../../../services/Axios/AxiosInstance/useAxiosInstency";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { logIn, loginUsingGoogle } = UseAuth(); // 
    const navigate = useNavigate();
    const { setToastMsg } = useToast();
    const [error, setError] = useState("");
    const axiosInstancy = useAxiosInstency()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const form = e.target;
        const { email, password } = Object.fromEntries(new FormData(form));

        try {
            // Step 1: Firebase/Auth login
            await logIn(email, password);

            // Step 2: Toast
            setToastMsg({
                type: "success",
                message: "Login successful 🎉",
            });

            // Step 3: Navigate to home page
            navigate("/");
        } catch (err) {
            setToastMsg({
                type: "error",
                message: "Login failed",
            });
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleLoginWithGoogle = async () => {
        setLoading(true);
        setError("");

        try {
           
            const userCredential = await loginUsingGoogle();
            const { email, displayName, photoURL } = userCredential.user;
         

           
            await axiosInstancy.post("/users", {
                email,
                displayName,
                photoURL,
                role: "member",
                created_at: new Date().toISOString(),
            });

           
            setToastMsg({
                type: "success",
                message: "Login successful 🎉",
            });
            navigate("/");

        } catch (err) {
            setToastMsg({
                type: "error",
                message: "Login failed",
            });
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-76px)] flex items-center justify-center text-black">

            <HeadProvider>
                <Title>Log In | CoreX-Gym</Title>
                <Meta name="description" content="Login Page of coreX-gym" />
            </HeadProvider>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden"
            >
                {/* Left: Animation */}
                <div className="md:w-1/2 bg-gradient-to-tr from-indigo-500 to-pink-500 sm:flex items-center justify-center p-6 hidden">
                    <img src={loginImg} alt="" />
                </div>

                {/* Right: Form */}
                <div className="md:w-1/2 p-8 py-20">
                    <h2 className="text-3xl font-bold text-center text-gray700 mb-6">
                        Welcome Back
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="flex items-center border rounded-xl px-3 border-black focus-within:border-indigo-400">
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
                        <div className="flex items-center border rounded-xl px-3 border-black focus-within:border-indigo-400">
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 outline-none"
                                required
                                name="password"
                            />
                        </div>

                        {error && (
                            <p className="text-red-700 font-bold text-[0.8rem] text-center">
                                {error}
                            </p>
                        )}

                        {/* Register link */}
                        <div className="mb-4 text-[0.8rem] flex gap-1">
                            <span>Don't have an account?</span>
                            <Link to={"/register"} className="text-blue-800 font-bold">
                                Register
                            </Link>
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner text-warning"></span>
                            ) : (
                                "Login"
                            )}
                        </motion.button>
                    </form>


                    <p className="text-center font-bold text-[0.8rem] my-3">or</p>

                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg transition w-full font-bold justify-center hover:scale-105 transform cursor-pointer" onClick={handleLoginWithGoogle}>
                        <FcGoogle className="text-2xl" size={25} />
                        Continue with Google
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
