import React, { useState } from "react";
import useSecureAxios from "../../services/Axios/SecureAxios/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../custom hooks/UseAuth";
import Loading from "../../shared/Loading/Loading";

// icons
import { Dumbbell } from "lucide-react";
import ClassCard from "./ClassCard";
import { HeadProvider, Meta, Title } from "react-head";

const AllClasses = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const secureAxios = useSecureAxios();
    const { observerLoading } = UseAuth();

    const { isLoading, data: classes = [] } = useQuery({
        queryKey: ["classes", page],
        enabled: !observerLoading,
        queryFn: async () => {
            const res = await secureAxios(`/classes?page=${page}`);
            setTotalPages(res.data.totalPages);
            return res.data.classes;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="sm:max-w-7xl mx-auto px-4 py-12">

            <HeadProvider>
                <Title>Classes | CoreX-Gym</Title>
                <Meta name="description" content="All Classes of coreX-gym" />
            </HeadProvider>

            <h2 className="text-4xl font-extrabold mb-10 text-center text-main tracking-wide">
                <Dumbbell className="inline-block w-9 h-9 mr-2 text-[#22d3ee]" />
                All Classes
            </h2>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {classes.map((cls, i) => <ClassCard key={i} cls={cls}></ClassCard>)}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-4 py-2 rounded-lg bg-[#0f172a] text-[#22d3ee] font-medium border border-[#22d3ee] shadow hover:bg-[#1e293b] disabled:opacity-40 cursor-pointer"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all border cursor-pointer ${page === i + 1
                            ? "bg-main text-black border-main shadow-lg"
                            : "bg-[#0f172a] text-gray-300 border-gray-600 hover:bg-[#1e293b] hover:text-main"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 rounded-lg bg-[#0f172a] text-[#22d3ee] font-medium border border-[#22d3ee] shadow hover:bg-[#1e293b] disabled:opacity-40 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllClasses;
