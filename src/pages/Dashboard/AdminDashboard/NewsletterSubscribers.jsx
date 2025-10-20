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

   

    if (isLoading) return <Loading></Loading>
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    if (subscribers.length === 0) {
        return <div className="flex items-center h-[calc(100vh-50px)] font-bold justify-center text-red-400">No Subscriber Found</div>
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-main/80">All Newsletter Subscribers</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full shadow table-sm">
                    <thead className="">
                        <tr className="bg-main text-left">
                            <th className="font-medium">#</th>
                            <th className="font-medium">Name</th>
                            <th className="font-medium">Email</th>
                            <th className="font-medium">Subscribed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((sub, index) => (
                            <tr
                                key={sub._id || index}
                                className="border-b border-gray-500"
                            >
                                <td>{index + 1}</td>
                                <td>{sub.name || "-"}</td>
                                <td>{sub.email}</td>
                                <td>
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
