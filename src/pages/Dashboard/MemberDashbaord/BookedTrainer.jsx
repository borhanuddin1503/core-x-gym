import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";
import Swal from "sweetalert2";
import UseAuth from "../../../custom hooks/UseAuth";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import Loading from "../../../shared/Loading/Loading";

const BookedTrainer = () => {
    const { user, observerLoading } = UseAuth();
    const secureAxios = useSecureAxios();
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [error, setError] = useState("");

    // React Query: fetch booked trainers
    const { data: bookings, isLoading, isError, error: queryError } = useQuery({
        queryKey: ["bookedTrainer", user?.email],
        enabled: !!user && !observerLoading,
        queryFn: async () => {
            const res = await secureAxios.get(`/payments/booked/${user.email}`);
            return res.data;
        },
    });

    // handle review submit
    const handleSubmit = async () => {
        try {
            setError("");
            if (!review.trim() || rating === 0) {
                setError("Please give a Review and Rating");
                return;
            }

            const finalData = {
                trainerName: selectedBooking.trainerName,
                user: selectedBooking.user,
                review: review.trim(),
                rating,
                createdAt: new Date().toISOString()
            };

            await secureAxios.post("/reviews", finalData);
            Swal.fire("Success", "Review Uploaded Successfully", "success");
            setShowModal(false);
            setReview("");
            setRating(5);
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    if (isLoading) return <Loading></Loading>
    if (isError)
        return (
            <div className="text-center mt-10 text-red-400">
                Error: {queryError.message}
            </div>
        );

    if (!bookings || bookings.length === 0)
        return (
            <div className="text-center mt-10 text-red-400">
                No Booked Trainer Found
            </div>
        );

    return (
        <div className="overflow-x-auto p-6 max-w-5xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-main mb-6">My Booked Trainers</h2>

            {/* Table */}
            <table className="table w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th>#</th>
                        <th>Trainer Name</th>
                        <th>Class</th>
                        <th>Slot Days</th>
                        <th>Slot Time</th>
                        <th>Package</th>
                        <th>Price</th>
                        <th>Payment Status</th>
                        <th>Paid At</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => {
                        const {
                            trainerName,
                            slot,
                            packageName,
                            price,
                            paymentIntent,
                            paidAt,
                        } = booking;
                        return (
                            <tr key={booking._id}>
                                <td>{index + 1}</td>
                                <td>{trainerName}</td>
                                <td>{slot.className}</td>
                                <td>{slot.availableDays.join(", ")}</td>
                                <td>{slot.availableTimes}</td>
                                <td>{packageName}</td>
                                <td>${price}</td>
                                <td>
                                    <span
                                        className={`badge ${paymentIntent.status === "succeeded"
                                                ? "badge-success"
                                                : "badge-warning"
                                            }`}
                                    >
                                        {paymentIntent.status}
                                    </span>
                                </td>
                                <td>{new Date(paidAt).toLocaleString()}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelectedBooking(booking);
                                            setShowModal(true);
                                        }}
                                        className="btn btn-sm bg-main text-white flex items-center gap-1"
                                    >
                                        <FaStar /> Review
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Review Modal */}
            {showModal && selectedBooking && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-main mb-4">Submit Review</h3>

                        {/* Star Rating */}
                        <div className="mb-4">
                            <Rating
                                emptySymbol={<FaRegStar className="text-yellow-400 text-2xl" />}
                                fullSymbol={<FaStar className="text-yellow-400 text-2xl" />}
                                fractions={1}
                                initialRating={rating}
                                onChange={(rate) => setRating(rate)}
                            />
                        </div>

                        {/* Textarea */}
                        <textarea
                            className="textarea textarea-bordered w-full mb-2"
                            placeholder="Type your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="modal-action">
                            <button className="btn bg-main text-white" onClick={handleSubmit}>
                                Submit
                            </button>
                            <button
                                className="btn btn-error text-white"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default BookedTrainer;
