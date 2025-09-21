import React, { useEffect, useState } from "react";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading/Loading";

const NewsletterSubscribers = () => {
    const secureAxios = useSecureAxios();


    // Fetch subscribers
    const { data: subscribers = [], isLoading, error } = useQuery({
        queryKey: ['newsletterSubscribers'],
        queryFn: async () => {
            const res = await secureAxios('/newsLetterSubscribers');
            return res.data;
        }
    })

    console.log(subscribers)

    if (isLoading) return <Loading></Loading>
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    if (subscribers.length === 0) {
        return <div className="flex items-center h-[calc(100vh-50px)] font-bold justify-center text-red-400">No Subscriber Found</div>
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">All Newsletter Subscribers</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">#</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Email</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Subscribed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((sub, index) => (
                            <tr
                                key={sub._id || index}
                                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                            >
                                <td className="py-3 px-6 text-gray-700">{index + 1}</td>
                                <td className="py-3 px-6 text-gray-700">{sub.name || "-"}</td>
                                <td className="py-3 px-6 text-gray-700">{sub.email}</td>
                                <td className="py-3 px-6 text-gray-700">
                                    {new Date(sub.subscribedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewsletterSubscribers;
