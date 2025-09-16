
import { useQuery } from "@tanstack/react-query";
import TrainerCard from "./TrainerCard";
import useAxiosInstency from "../../services/Axios/AxiosInstance/AxiosInstency";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading/Loading";



const Trainers = () => {
    const axiosInstency = useAxiosInstency();

    // fetch function
    const fetchTrainers = async () => {
        const res = await axiosInstency("/trainers");
        return res.data;
    };

    const {
        data: trainers = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["trainers"],
        queryFn: fetchTrainers,
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (isError) {
        return Swal.fire('Error', 'Something went wrong' , 'error');
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Trainers 👨‍🏫</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                    <TrainerCard key={trainer._id} trainer={trainer} />
                ))}
            </div>
        </div>
    );
};

export default Trainers;
