import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../custom hooks/UseAuth";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import Loading from "../../../shared/Loading/Loading";

const ActivityLog = () => {
    const secureAxios = useSecureAxios();
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const { user, observerLoading } = UseAuth();

    // 🔹 React Query Fetch
    const {
        data: log = {},
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["activityLogs"],
        enabled: !!user && !observerLoading,
        queryFn: async () => {
            const res = await secureAxios.get(`/trainers/applicants/${user.email}`);
            return res.data;
        },
    });

    if (isLoading || observerLoading) return <Loading />;
    if (isError) return <div className="text-red-500">Error: {error.message}</div>;

    if (!log) {
        return (
            <div className="flex items-center h-[calc(100vh-100px)] font-bold justify-center text-red-400">
                No activity found
            </div>
        );
    }

    return (
        <div className="overflow-x-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-main">Activity Log</h2>
            <table className="table w-full border rounded-xl shadow-lg text-center">
                <thead>
                    <tr className="bg-gray-100 text-main">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>

                    <tr className="text-black">
                        <td className="font-semibold">{log.fullName}</td>
                        <td>{log.email}</td>
                        <td>
                            <span
                                className={`badge px-4 py-2 capitalize ${log.status === "pending"
                                    ? "badge-info text-white"
                                    : "badge-error text-white"
                                    }`}
                            >
                                {log.status}
                            </span>
                        </td>
                        <td>
                            {log.status === "rejected" ? (
                                <div className="flex justify-center">
                                    <button
                                        className="btn btn-sm btn-outline text-main flex items-center gap-2"
                                        onClick={() =>
                                            setSelectedFeedback(
                                                log.feedback || "No feedback provided"
                                            )
                                        }
                                    >
                                        <FaEye /> View
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center">—</p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* DaisyUI Modal */}
            {selectedFeedback && (
                <>
                    <div className="modal modal-open">
                        <div className="modal-box rounded-2xl shadow-xl">
                            <h3 className="font-bold text-lg text-main">
                                Rejection Feedback
                            </h3>
                            <p className="py-4 text-gray-700">{selectedFeedback}</p>
                            <div className="modal-action">
                                <button
                                    onClick={() => setSelectedFeedback(null)}
                                    className="btn btn-sm btn-error text-white"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ActivityLog;
