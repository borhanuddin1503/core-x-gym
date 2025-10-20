import React, { useState, useEffect } from "react";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import useAxiosInstency from "../../services/Axios/AxiosInstance/useAxiosInstency";
import Swal from "sweetalert2";
import useSecureAxios from "../../services/Axios/SecureAxios/useSecureAxios";
import { HeadProvider, Meta, Title } from "react-head";


export default function PaymentForm({ booking, userQuery }) {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const axiosInstency = useAxiosInstency();
    const secureAxios = useSecureAxios();


    useEffect(() => {
        async function createIntent() {
            try {
                const res = await axiosInstency.post("/create-payment-intent", {
                    price: booking?.price
                });
                const data = res.data;
                if (data?.clientSecret) setClientSecret(data.clientSecret);
                else setError("Payment initialization failed");
            } catch (err) {
                console.error(err);
                setError("Payment initialization failed");
            }
        }
        createIntent();
    }, [booking.price, booking.trainerId, booking.slot.className]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!stripe || !elements) return;
        setLoading(true);

        const card = elements.getElement(CardElement);
        if (!card) return setError("Card element not found");

        try {
            const { error: stripeErr, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card,
                        billing_details: {
                            name: userQuery.displayName,
                            email: userQuery.email,
                        },
                    },
                }
            );

            if (stripeErr) {
                setError(stripeErr.message);
                setLoading(false);
                return;
            }
            console.log(booking)

            if (paymentIntent && paymentIntent.status === "succeeded") {
                await Promise.all([
                    secureAxios.post("/payments", {
                        trainerName: booking.trainerName,
                        slot: booking.slot,
                        packageName: booking.packageName,
                        price: booking.price,
                        user: {
                            displayName: userQuery.displayName,
                            email: userQuery.email,
                            photoURL: userQuery.photoURL,
                        },
                        paymentIntent,
                        paidAt: new Date().toISOString(),
                    }),

                    secureAxios.patch(`/trainers/${booking.trainerEmail}/slots/book`, {
                        className: booking.slot.className,
                        userName: userQuery.displayName,
                        userEmail: userQuery.email,
                        packageName: booking.packageName,
                    }),
                    secureAxios.patch(`/classes/bookingCount/${booking.slot.classId}`, {
                        userName: userQuery.displayName,
                        userEmail: userQuery.email,
                        trainerEmail: booking.trainerName,
                        packageName: booking.packageName,
                        bookedAt: new Date().toISOString(),
                    })
                ]);
                Swal.fire('Success', 'Payment is Success', "success");
                setSucceeded(true);
            } else {
                setError("Payment not completed");
            }
        } catch (err) {
            console.error(err);
            setError("Payment failed. Try again.");
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-2xl shadow-xl text-white mb-2"
        >
            <HeadProvider>
                <Title>Payment | CoreX-Gym</Title>
                <Meta name="description" content="Payment page of Core X Gym" />
            </HeadProvider>

            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400 uppercase tracking-wide">
                Complete Your Payment
            </h2>


            {/* Booking Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-black">
                <div className="bg-white p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">Booking Details</h3>
                    <p><span className="text-gray-400">Trainer:</span> {booking.trainerName}</p>
                    <p><span className="text-gray-400">ClassName:</span> {booking.slot.className}</p>
                    <p><span className="text-gray-400">Time:</span> {booking.slot.availableTimes}</p>
                    <p><span className="text-gray-400">Days:</span> {booking.slot.availableDays.join(', ')}</p>
                    <p><span className="text-gray-400">Package:</span> {booking.packageName}</p>
                    <p className="mt-4 font-extrabold text-yellow-300 text-2xl">$ {booking.price}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">Your Info</h3>
                    <p><span className="text-gray-400">Name:</span> {userQuery.displayName}</p>
                    <p><span className="text-gray-400">Email:</span> {userQuery.email}</p>
                </div>
            </div>

            {/* Card Input */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
                <label className="block text-sm text-gray-400 mb-2">Card Details</label>
                <div className="p-3 rounded-md bg-gray-300 border border-gray-700 text-white">
                    <CardElement options={{ hidePostalCode: true }} />
                </div>
            </div>

            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
            {succeeded ? (
                <div className="p-5 rounded-lg bg-green-600 text-white text-center text-lg font-semibold">
                    ✅ Payment successful — Thank you!
                </div>
            ) : (
                <button
                    type="submit"
                    disabled={!stripe || loading || !clientSecret}
                    className="w-full py-3 rounded-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-black disabled:opacity-50 transition"
                >
                    {loading ? "Processing..." : `Pay $ ${booking.price}`}
                </button>
            )}
        </form>
    );
}