import React, { useEffect, useState } from "react";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../../shared/Loading/Loading";
import UseAuth from "../../../custom hooks/UseAuth";
import Swal from "sweetalert2";
const ApplyedTrainer = () => {
    const secureAxios = useSecureAxios();
    const [showRejectModal, setShowRejectModal] = useState(false);
    const { observerLoading, user } = UseAuth();


    const { data: appliedTrainers = [], isLoading } = useQuery({
        queryKey: ['pendingTrainers', user],
        queryFn: async () => {
            const res = await secureAxios.get('/applied/trainers/pending', {
                headers: { 'Cache-Control': 'no-cache' }
            });
            return res.data;
        }
    });




    console.log(appliedTrainers)

    if (isLoading) return <Loading></Loading>

    if (appliedTrainers.length === 0) {
        return <div className="flex items-center h-[calc(100vh-50px)] font-bold justify-center text-red-400">No Apply Founded</div>
    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-main/80">Applied Trainers</h2>
            <table className="table w-full text-black">
                <thead>
                    <tr className="bg-gray200">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Experience</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appliedTrainers?.map((applicant, index) => (
                        <tr key={applicant._id}>
                            <td>{index + 1}</td>
                            <td>{applicant.fullName}</td>
                            <td>{applicant.email}</td>
                            <td>{applicant.experience} yrs</td>
                            <td>
                                <Link
                                    to={`/dashboard/appliedTrainers/${applicant._id}`}
                                    className="btn btn-sm btn-info text-white"
                                >
                                    Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ApplyedTrainer