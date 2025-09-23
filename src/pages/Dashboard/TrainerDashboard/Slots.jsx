import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../custom hooks/UseAuth";
import Loading from "../../../shared/Loading/Loading";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import Swal from "sweetalert2";

const TrainerSlots = () => {
    const secureAxios = useSecureAxios();
    const queryClient = useQueryClient();
    const { user, observerLoading } = UseAuth();

    // fetch trainer info
    const { data: trainer = {}, isLoading, error } = useQuery({
        queryKey: ["trainerInfo", user?.email],
        enabled: !!user && !observerLoading,
        queryFn: async () => {
            const res = await secureAxios.get(`/trainers/${user.email}`);
            return res.data;
        },
    });

    // delete slot mutation
    const deleteSlotMutation = useMutation({
        mutationFn: async (className) => {
            const res = await secureAxios.patch(
                `/trainers/${user.email}/slots/remove`, { className }
            );
            return res.data;
        },
        onSuccess: (data) => {
            Swal.fire({
                title: data.message || "Slot deleted successfully",
                icon: "success",
            });
            queryClient.invalidateQueries(["trainerInfo", user.email]);
        },
        onError: () => {
            Swal.fire({
                title: "Failed to delete slot",
                icon: "error",
            });
        },
    });

    const handleDelete = (className) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Slot "${className}" will be permanently deleted!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSlotMutation.mutate(className);
            }
        });
    };

    if (isLoading) return <Loading />;
    if (error) return <p className="text-red-500 text-center">Error fetching trainer</p>;

    if (trainer.slots.length === 0) return <div className="min-h-[calc(100vh-50px)] flex items-center justify-center"><h2 className="text-red-500 text-center font-bold">No Slots Available</h2></div>

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-main mb-5">
                {trainer.fullName}'s Slots
            </h2>

            <table className="min-w-full border border-gray-300 text-sm border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Class</th>
                        <th className="border border-gray-300 px-4 py-2">Days</th>
                        <th className="border border-gray-300 px-4 py-2">Times</th>
                        <th className="border border-gray-300 px-4 py-2">Booked Users</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trainer.slots?.map((slot, idx) => (
                        <tr key={idx} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{slot.className}</td>
                            <td className="border border-gray-300 px-4 py-2">{slot.availableDays.join(", ")}</td>
                            <td className="border border-gray-300 px-4 py-2">{slot.availableTimes}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {slot.bookings?.length > 0 ? (
                                    <ul className="list-none list-inside">
                                        {slot.bookings.map((b, i) => (
                                            <li key={i}>{b.userName} ({b.userEmail})</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No bookings</span>
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(slot.className)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default TrainerSlots;
