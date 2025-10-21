import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Dumbbell,
    Wallet,
    Calendar,
    Newspaper,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../custom hooks/UseAuth";
import useUserRole from "../../../custom hooks/useUserRole";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import useTheme from "../../../custom hooks/useTheme";
import PaymentChart from "../AdminDashboard/PaymentChart";

const DashHome = () => {
    const { user } = UseAuth();
    const { role, roleLoading } = useUserRole();
    const secureAxios = useSecureAxios();
    const { theme } = useTheme();

    // 🧠 Fetch dashboard data
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["dashboard-stats", role, user?.email],
        enabled: !roleLoading && !!user?.email,
        queryFn: async () => {
            if (role === "admin") {
                const [users, trainers, classes, revenue, posts] = await Promise.all([
                    secureAxios("/all-user"),
                    secureAxios("/trainers"),
                    secureAxios("/classes/withoutTrainers"),
                    secureAxios("/admin/total-balance"),
                ]);
                return {
                    totalUsers: users.data.length,
                    totalTrainers: trainers.data.length,
                    totalClasses: classes.data.length,
                    totalRevenue: revenue.data.totalBalance,
                };
            }else{
                return {}
            }
        },
    });

    if (isLoading || roleLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-main"></span>
            </div>
        );
    }

    // 🧱 Define role-based cards
    const cards = [
        { icon: Users, title: "Total Users", value: stats.totalUsers },
        { icon: Dumbbell, title: "Total Trainers", value: stats.totalTrainers },
        { icon: Calendar, title: "Classes", value: stats.totalClasses },
        { icon: Wallet, title: "Revenue", value: `$${stats.totalRevenue}` },
    ]

    return (
        <div className="min-h-[calc(100vh-60px)]">
            {role === 'admin' ?
                <div className="flex gap-5 flex-col md:flex-row">
                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:w-2/12">
                        {cards.map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`flex items-center p-6 rounded-lg border-l-4 border-l-main shadow-lg hover:shadow-xl justify-between cursor-pointer ${theme === "dark"
                                    ? "bg-gray-800 border border-gray-600 text-gray-100"
                                    : "bg-white border border-gray-200 text-gray-700"
                                    }`}
                            >
                                <div>
                                    <h3 className="text-sm font-semibold text-center">{card.title}</h3>
                                    <p className="text-2xl font-bold text-main mt-2">{card.value}</p>
                                </div>
                                <div className="p-4 rounded-full bg-yellow-100 mb-4">
                                    <card.icon className="w-5 h-5 text-yellow-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="md:w-10/12">
                        <PaymentChart></PaymentChart>
                    </div>
                </div> :
                <div className="flex justify-center items-center min-h-[calc(100vh-60px)]">
                    <h2 className="text-3xl font-bold text-center text-main mb-10">
                        Welcome, <span className="capitalize">{user?.displayName}</span> 👋
                    </h2>
                </div>
            }

        </div >
    );
};

export default DashHome;
