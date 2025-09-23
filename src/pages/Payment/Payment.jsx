import { useLocation, useParams } from "react-router";
import useAxiosInstency from "../../services/Axios/AxiosInstance/useAxiosInstency";
import { useQueries, useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading/Loading";
import UseAuth from "../../custom hooks/UseAuth";
import useSecureAxios from "../../services/Axios/SecureAxios/useSecureAxios";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51S0NMW2LkMdNDQQe7WFz62qJvLMZ1yGI02XuCHC8GIdzeQbQCBIIAXghQOiFI4qrDJdRG8p7IzIn8GYwqy58lop500bwV5bN0N');


export default function Payment() {
    const location = useLocation();
    const { id: trainerId } = useParams();
    const axiosInstency = useAxiosInstency();
    const secureAxios = useSecureAxios();
    const { slot, packages, price } = location.state;
    const { user } = UseAuth();


    const {data:trainerQuery = {} , isLoading , error} = useQuery(
        {
            queryKey: ["trainers", trainerId],
            enabled: !!trainerId,
            queryFn: async () => {
                const res = await axiosInstency(`/trainers?trainerId=${trainerId}`);
                return res.data;
            },
        },
    )   

    const booking = {
        trainerName: trainerQuery.fullName,
        trainerId: trainerQuery._id,
        slot,
        packageName: packages,
        price,
    };


    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <div className="flex h-screen items-center justify-center text-red-500 font-bold">Error: {error.message}</div>;
    }

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm booking={booking} userQuery={user} />
        </Elements>
    );
}
