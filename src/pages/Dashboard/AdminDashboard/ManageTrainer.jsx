import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import Loading from "../../../shared/Loading/Loading";

const ManageTrainers = () => {
    const queryClient = useQueryClient();
    const secureAxios = useSecureAxios();

    // ✅ fetch all trainers
    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ["trainers"],
        queryFn: async () => {
            const res = await secureAxios("/trainers"); // backend route
            return res.data;
        },
    });

    //      mutation for delete trainer (actually change role back to member)
    const mutation = useMutation({
        mutationFn: async (trainer) => {
            // 1️⃣ Update user role by email
            const roleRes = await secureAxios.patch(`/users/${trainer.email}`, {
                role: "member",
            });

            // 2️⃣ Delete trainer from trainers collection by id
            const deleteRes = await secureAxios.delete(
                `/trainers?trainerId=${trainer._id}`
            );

            return { roleRes: roleRes.data, deleteRes: deleteRes.data };
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["trainers"]);
            Swal.fire("Removed!", "Trainer role revoked & removed from trainers list.", "success");
        },
    });



    // ✅ handle delete
    const handleDelete = (trainer) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Remove ${trainer.fullName} from Trainer role?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove!",
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(trainer);
            }
        });
    };

    if (isLoading) return <Loading></Loading>;
    if (trainers.length === 0) {
        return <div className="flex items-center h-[calc(100vh-50px)] font-bold justify-center text-red-400">No Trainers Found</div>
    }
    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Trainers</h2>
            <table className="table w-full text-black border-collapse">
                <thead className="text-black">
                    <tr >
                        <th className="border">#</th>
                        <th className="border">Name</th>
                        <th className="border">Email</th>
                        <th className="border">Experience</th>
                        <th className="border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers.map((trainer, index) => (
                        <tr key={trainer._id}>
                            <td className="border">{index + 1}</td>
                            <td className="border">{trainer.fullName}</td>
                            <td className="border">{trainer.email}</td>
                            <td className="border">{trainer.experience} yrs</td>
                            <td className="border">
                                <button
                                    onClick={() => handleDelete(trainer)}
                                    className="btn btn-sm btn-error text-white"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTrainers;
