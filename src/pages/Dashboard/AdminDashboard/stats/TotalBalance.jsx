import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecureAxios from "../../../../services/Axios/SecureAxios/useSecureAxios";
import useTheme from "../../../../custom hooks/useTheme";

const TotalBalance = () => {
    const secureAxios = useSecureAxios();
    const {theme} = useTheme();

    const { data: balance } = useQuery({
        queryKey: ["totalBalance"],
        queryFn: async () => {
            const res = await secureAxios.get("/admin/total-balance");
            return res.data;
        },
    });

    return (
        <div className={`space-y-6`}>
            {/* Total Balance */}
            <div className={`shadow-xl rounded-2xl border-l-4 border-yellow-400 text-center py-6 ${theme === 'dark' && 'border'}`}>
                <h2 className="text-2xl font-bold text-main">Total Balance</h2>
                <p className="text-3xl font-semibold mt-2 ">
                    ${balance?.totalBalance || 0}
                </p>
            </div>
        </div>
    )
}


export default TotalBalance