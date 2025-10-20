import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import newsletter from '../../../assets/images/newsletter.jpg'
import useAxiosInstency from "../../../services/Axios/AxiosInstance/useAxiosInstency";
import useTheme from "../../../custom hooks/useTheme";

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosInstancy = useAxiosInstency();
  const {theme} = useTheme();

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      subscribedAt: new Date().toISOString()
    }
    try {
      const res = await axiosInstancy.post("/newsLetter", finalData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Subscribed!",
          text: "You have successfully subscribed to our newsletter.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message,
      });
    }
  };

  return (
      <div className={`max-w-7xl mx-auto  p-4 py-10 rounded-2xl grid md:grid-cols-2 gap-10 items-center `} data-aos="zoom-in-up">
        {/* Left Side Image */}
        <div className="relative" >
          <img
            src={newsletter} // Replace with gym-related image
            alt="Newsletter"
            className="rounded-2xl shadow-md object-cover w-full h-[350px]"
          />
          <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
        </div>

        {/* Right Side Content */}
        <div >
          <h2 className="text-3xl font-bold mb-4">
            Join Our <span className="text-main">Newsletter</span>
          </h2>
          <p className="text-gray700 mb-6">
            Stay updated with the latest fitness tips, exclusive offers, and
            upcoming events from <span className="font-semibold">CoreX Gym</span>.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-main outline-none"
            />

            {/* Email */}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-main outline-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-main hover:bg-main/90 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
  );
};

export default Newsletter;
