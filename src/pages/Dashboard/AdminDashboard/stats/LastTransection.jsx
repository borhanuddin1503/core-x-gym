import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecureAxios from "../../../../services/Axios/SecureAxios/useSecureAxios";
import Loading from "../../../../shared/Loading/Loading";

const LastTransection = () => {
    const secureAxios = useSecureAxios();
    const { data: transactions = [] ,isLoading } = useQuery({
        queryKey: ["lastTransactions"],
        queryFn: async () => {
            const res = await secureAxios.get("/admin/last-transactions");
            return res.data;
        },
    });

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className="mb-6 shadow-xl rounded-2xl bg-white p-6 my-6">
            <h3 className="text-xl font-semibold mb-4 text-main text-center">
                Last 6 Transactions
            </h3>
            <table className="w-full border text-black">
                <thead>
                    <tr className="text-black border font-bold">
                        <th className="p-2">Member</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Trainer</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx._id} className="border-b text-center">
                            <td className="p-2">{tx.user.displayName}</td>
                            <td className="p-2">${parseFloat(tx.paymentIntent.amount) / 100}</td>
                            <td className="p-2">
                                {tx.trainerName}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LastTransection