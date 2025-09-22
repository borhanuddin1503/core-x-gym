import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecureAxios from "../../../../services/Axios/SecureAxios/useSecureAxios";

const TotalBalance = () => {
    const secureAxios = useSecureAxios()

    const { data: balance } = useQuery({
        queryKey: ["totalBalance"],
        queryFn: async () => {
            const res = await secureAxios.get("/admin/total-balance");
            return res.data;
        },
    });

    return (
        <div className="space-y-6">
            {/* Total Balance */}
            <div className="bg-white shadow-xl rounded-2xl border-l-4 border-yellow-400 text-center py-6">
                <h2 className="text-2xl font-bold text-main">Total Balance</h2>
                <p className="text-3xl font-semibold mt-2">
                    ${balance?.totalBalance || 0}
                </p>
            </div>
        </div>
    )
}


export default TotalBalance