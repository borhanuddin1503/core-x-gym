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

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Trainers</h2>
            <table className="table w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Experience</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers.map((trainer, index) => (
                        <tr key={trainer._id}>
                            <td>{index + 1}</td>
                            <td>{trainer.fullName}</td>
                            <td>{trainer.email}</td>
                            <td>{trainer.experience} yrs</td>
                            <td>
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
