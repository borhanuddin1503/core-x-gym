import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import Loading from "../../../shared/Loading/Loading";

const ApplicantDetails = () => {
  const { id } = useParams();
  const axiosSecure = useSecureAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Fetch applicant
  const { data: applicant = {}, isLoading } = useQuery({
    queryKey: ["appliedTrainer", id],
    queryFn: async () => {
      const res = await axiosSecure(`/applied/trainers/pending/${id}`);
      return res.data;
    },
  });

 

  // Confirm mutation
  const confirmMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.patch(`/users/${applicant?.email}`, { role: "trainer" });
      await axiosSecure.patch(`/trainers/${applicant?._id}/confirm`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appliedTrainers"]);
      Swal.fire("Confirmed!", "Trainer role assigned successfully.", "success");
      navigate("/dashboard/appliedTrainers", { replace: true });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.patch(`/trainers/${applicant?._id}/reject`, { feedback });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appliedTrainers"]);
      Swal.fire("Rejected!", "Trainer application rejected.", "info");
      navigate("/dashboard/appliedTrainers", { replace: true });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-main">
        Trainer Application Details
      </h2>

      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Profile Image */}
        <img
          src={applicant.profileImage}
          alt={applicant.fullName}
          className="w-40 h-40 rounded-full object-cover border-4 border-main shadow-lg"
        />

        {/* Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-700 text-lg"><span className="text-main">Name:</span> {applicant.fullName}</p>
            <p className="font-semibold text-gray-700 text-lg"><span className="text-main">Email:</span> {applicant.email}</p>
            <p className="font-semibold text-gray-700 text-lg"><span className="text-main">Phone:</span> {applicant.phone}</p>
            <p className="font-semibold text-gray-700 text-lg"><span className="text-main">Age:</span> {applicant.age}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700  text-lg"><span className="text-main">Experience:</span> {applicant.experience} yrs</p>
            <p className="font-semibold text-gray-700  text-lg"><span className="text-main">Skills:</span> {applicant.skills?.join(", ")}</p>
            <p className="font-semibold text-gray-700  text-lg"><span className="text-main">Available Days:</span> {applicant?.slots?.map((slt , i) => <span key={i}>{slt.availableDays?.join(", ")}</span>)}</p>
            <p className="font-semibold text-gray-700  text-lg"><span className="text-main">Available Times:</span>{
              applicant.slots.map((slt , i) => <span key={i}>{slt.availableTimes}</span>)
            }</p>
            <p className="font-semibold text-gray-700  text-lg"><span className="text-main">Applied At:</span> {new Date(applicant.applayAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={() => confirmMutation.mutate()}
          className="btn btn-success btn-lg shadow-lg hover:scale-105 transform transition"
        >
          Confirm
        </button>
        <button
          onClick={() => setShowRejectModal(true)}
          className="btn btn-error btn-lg shadow-lg hover:scale-105 transform transition text-white"
        >
          Reject
        </button>
      </div>

      {/* Reject Modal */}
      {showRejectModal &&
        Swal.fire({
          title: "Are you sure to reject this applicant?",
          html: `
      <div style="text-align:left">
        <p className='text-main'><strong>Name:</strong> ${applicant.fullName}</p>
        <p className='text-main'><strong>Email:</strong> ${applicant.email}</p>
        <p className='text-main'><strong>Phone:</strong> ${applicant.phone}</p>
        <p className='text-main'><strong>Experience:</strong> ${applicant.experience} yrs</p>
      </div>
      <textarea 
        id="feedback" 
        class="swal2-textarea resize-none" 
        placeholder="Write rejection feedback..."
      ></textarea>
    `,
          showCancelButton: true,
          confirmButtonText: "Reject",
          cancelButtonText: "Cancel",
          preConfirm: () => {
            const feedback = document.getElementById("feedback").value;
            if (!feedback) {
              Swal.showValidationMessage("Please write feedback before rejecting");
            }
            setFeedback(feedback)
            return { feedback };
          },
        }).then((result) => {
          if (result.isConfirmed) {
            rejectMutation.mutate(result.value.feedback);
          }
          setShowRejectModal(false);
        })}

    </div>
  );
};

export default ApplicantDetails;
