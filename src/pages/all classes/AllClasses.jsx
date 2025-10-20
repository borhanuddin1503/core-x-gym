import React, { useState } from "react";
import useSecureAxios from "../../services/Axios/SecureAxios/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../custom hooks/UseAuth";
import Loading from "../../shared/Loading/Loading";

// icons
import { Dumbbell, SearchCheck } from "lucide-react";
import ClassCard from "./ClassCard";
import { HeadProvider, Meta, Title } from "react-head";
import { IoArrowBack, IoArrowForward, IoArrowForwardOutline } from "react-icons/io5";

const AllClasses = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState(""); // <-- search state
    const secureAxios = useSecureAxios();
    const { observerLoading } = UseAuth();
    const [sortByBooked, setSortByBooked] = useState("");


    // React Query দিয়ে data fetch
    const { data: classes = [], isLoading } = useQuery({
        queryKey: ["classes", page, search, sortByBooked],
        enabled: !observerLoading,
        queryFn: async () => {
            const res = await secureAxios.get(
                `/classes?page=${page}&search=${search}&sort=${sortByBooked}`
            );
            setTotalPage(res.data.totalPages || 1);
            return res.data.classes;
        },
    });


    // handle search
    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchValue = form.search.value.trim();
        setSearch(searchValue);
        setPage(1);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!classes || classes.length === 0) {
        return (
            <div className="h-[calc(100vh-100px)] flex justify-center items-center text-red-500 font-bold">
                No Classes Found
            </div>
        );
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

            <form onSubmit={handleSearch} className="mb-6 flex justify-between">
                {/* Search Box */}
                <div className="md:max-w-100 flex border border-main rounded-[10px] items-center py-2 px-4 gap-4">
                    <input
                        type="text"
                        id="search"
                        className="border-none outline-none w-full "
                        placeholder="Search for a Class"
                    />
                    <button type="submit">
                        <SearchCheck className="text-main" />
                    </button>
                </div>

                {/* Sorting Dropdown */}
                <select
                    value={sortByBooked}
                    onChange={(e) => setSortByBooked(e.target.value)}
                    className="border bg-root-bg rounded-[10px] px-4 py-2 py border-main outline-none"
                >
                    <option value="">All</option>
                    <option value="booked">Booked</option>
                    <option value="notBooked">Not Booked</option>
                </select>
            </form>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2 mb-8">
                {classes.map((cls) => (
                    <ClassCard key={cls._id} cls={cls}></ClassCard>
                ))}
            </div>

            {/* Pagination */}
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

export default AllClasses;
