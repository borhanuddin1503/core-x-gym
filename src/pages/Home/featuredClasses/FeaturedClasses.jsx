import React from "react";
import UseAuth from "../../../custom hooks/UseAuth";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import ClassCard from "../../all classes/ClassCard";

const FeaturedClasses = () => {
    const { user, observerLoading } = UseAuth();
    const secureAxios = useSecureAxios();
    const { data: featuredClasses = [], isLoading } = useQuery(
        {
            queryKey: ['featuredClasses'],
            enabled: !!user && !observerLoading,
            queryFn: async () => {
                const res = await secureAxios('feturedClasses');
                return res.data;
            }
        }
    )

    return (
        <section className="py-10  rounded-2xl relative px-4 md:px-16" data-aos="zoom-in-up">
            {/* Section Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-gray700">
                    Featured <span className="text-yellow-500">Classes</span>
                </h2>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Explore the key features that make our gym the perfect place for
                    your fitness journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredClasses.map((cls , i) =><ClassCard key={cls._id} cls={cls}></ClassCard>)}
            </div>
        </section>
    )
}

export default FeaturedClasses