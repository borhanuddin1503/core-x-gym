import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecureAxios from "../../../../services/Axios/SecureAxios/useSecureAxios";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loading from "../../../../shared/Loading/Loading";
const Charts = () => {
    const secureAxios = useSecureAxios();
    const { data, isLoading, error } = useQuery({
        queryKey: ["chartsData"],
        queryFn: async () => {
            const [subscribersRes, transactionsRes] = await Promise.all([
                secureAxios.get("/newsLetterSubscribers/member"),
                secureAxios.get("/admin/transactions/member"),
            ]);

            return {
                subscribers: subscribersRes.data,
                transactions: transactionsRes.data,
            };
        },
    });

    const subscribers = data?.subscribers;
    const transactions = data?.transactions;


    if (isLoading) return <Loading></Loading>;
    const chartData = [
        { name: "Paid Members", count: transactions.count },
        { name: "Subscribers", count: subscribers.count },
    ];


    return (
        <div className="bg-white shadow-xl rounded-2xl p-6  w-full">
            <div>
                <h3 className="text-xl font-semibold mb-4 text-main text-center">Members Comparison</h3>
                <div className="flex items-center justify-center">
                    <ResponsiveContainer width={350} height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#FACC15" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Charts