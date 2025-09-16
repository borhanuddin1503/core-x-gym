import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select, { components } from "react-select";
import UseAuth from "../../custom hooks/UseAuth";
import axios from "axios";
import useSecureAxios from "../../services/Axios/SecureAxios/useSecureAxios";
import Swal from "sweetalert2";
import makeAnimated from 'react-select/animated';
import imageCompression from "browser-image-compression";

const daysOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
];
const timeOptions = [
    { value: "10AM - 1PM", label: "10AM - 1PM" },
    { value: "1PM - 5PM", label: "1PM - 5PM" },
    { value: "5PM - 8PM", label: "5PM - 8PM" },
    { value: "8PM - 11PM", label: "8PM - 11PM" },
];

const skillsOptions = [
    "Weightlifting",
    "Cardio",
    "Yoga",
    "CrossFit",
    "Bodybuilding",
    "Strength Training",
    "Zumba",
];

const BeATrainer = () => {
    const secureAxios = useSecureAxios();
    const { user } = UseAuth();
    const [photoLoading, setPhotoLoading] = useState(false);
    const [photo, setPhoto] = useState('');
    const animatedComponents = makeAnimated();
    const availableDaysref = useRef();

    // upload photo in imgbb on change
    const handlePhotoChange = async (e) => {
        try {
            setPhotoLoading(true)
            const file = e.target.files[0];

            if (file) {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 600,
                    useWebWorker: true,
                }
                const compressedFile = await imageCompression(file, options);

                const formData = new FormData();
                formData.append("image", compressedFile);
                console.log(Object.fromEntries(formData));
                await axios.post(`https://api.imgbb.com/1/upload?key=6ab62bb4d9a2890c9cfc80752bf4bb20`, formData)
                    .then((data) => {
                        setPhoto(data.data.data)
                    });
            }
        } finally {
            setPhotoLoading(false);
        }
    }

    // define the form
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    // handle submit
    const onSubmit = async (data) => {
        try {
            const finalData = {
                ...data,
                availableDays: data.availableDays.map((d) => d.value),
                availableTimes: data.availableTimes.map((d) => d.value),
                status: "pending",
                applayAt: new Date().toISOString(),
            };

            const res = await secureAxios.post('/trainers', finalData);
            if (res.data.success) {
                Swal.fire({
                    title: res.data.message,
                    icon: "success",
                    draggable: false
                });
                reset();
                availableDaysref.current.clearValue()
            } else {
                Swal.fire({
                    title: res.data.message,
                    icon: "error",
                    draggable: false
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Failed to Apply',
                icon: "error",
                draggable: false
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-12 p-8 rounded-2xl shadow-md bg-none border border-main">


            <h2 className="text-3xl font-bold mb-8 text-center text-main">
                Rider Application Form
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Full Name */}
                <div>
                    <label className="block text-main font-semibold mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        {...register("fullName", { required: true })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 rounded-lg border border-main focus:ring-2 focus:ring-main text-black"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">Full name is required</p>
                    )}
                </div>

                {/* Email (read-only) */}
                <div>
                    <label className="block text-main font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        readOnly
                        value={user?.email}
                        className="w-full px-4 py-2 rounded-lg border border-main bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* Age */}
                <div>
                    <label className="block text-main font-semibold mb-2">Age</label>
                    <input
                        type="number"
                        {...register("age", { required: true })}
                        placeholder="Enter your age"
                        className="w-full px-4 py-2 rounded-lg border border-main focus:ring-2 focus:ring-main text-black"
                    />
                </div>

                {/* Profile Image */}
                <div>
                    <label htmlFor="" className="block text-main font-semibold mb-2 ">
                        Profile
                    </label>
                    <label
                        className="w-full block px-4 py-2 rounded-lg border border-main focus:ring-2 focus:ring-main text-black"
                        htmlFor="profile"
                    >
                        {photoLoading ? <div className="flex items-center justify-center"><span className="loading loading-spinner text-warning"></span></div> : photo ? `profile: ${photo.title}` : 'Choose Photo'}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="profile"
                        {...register("profileImage", { required: true, onChange: handlePhotoChange })}
                        className="hidden"
                    />
                    {errors.profileImage && (
                        <p className="text-red-500 text-sm mt-1">
                            Select profile pic
                        </p>
                    )}
                </div>

                {/* Skills (checkboxes) */}
                <div className="md:col-span-2">
                    <label className="block text-main font-semibold mb-2">Skills</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {skillsOptions.map((skill) => (
                            <label
                                key={skill}
                                className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                            >
                                <input
                                    type="checkbox"
                                    value={skill}
                                    {...register("skills", { required: true })}
                                    className="checkbox checkbox-accent"
                                />
                                <span className="text-black">{skill}</span>
                            </label>
                        ))}
                    </div>
                    {errors.skills && (
                        <p className="text-red-500 text-sm mt-1">
                            Select at least one skill
                        </p>
                    )}
                </div>

                {/* Available Days */}
                <div>
                    <label className="block text-main font-semibold mb-2">
                        Available Days
                    </label>
                    <Controller
                        name="availableDays"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                components={animatedComponents}
                                options={daysOptions}
                                isMulti
                                className="text-black"
                                placeholder="Select days..."
                                ref={availableDaysref}
                            />
                        )}
                    />
                    {errors.availableDays && (
                        <p className="text-red-500 text-sm mt-1">Select at least one day</p>
                    )}
                </div>

                {/* Available time */}
                <div>
                    <label className="block text-main font-semibold mb-2">
                        Available Time
                    </label>
                    <Controller
                        name="availableTimes"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={timeOptions}
                                components={animatedComponents}
                                isMulti
                                className="text-black"
                                placeholder="Select Times..."
                            />
                        )}
                    />
                    {errors.availableTimes && (
                        <p className="text-red-500 text-sm mt-1">Select at least one time</p>
                    )}
                </div>

                {/* Phone No */}
                <div className="">
                    <label className="block text-main font-semibold mb-2">Phone No</label>
                    <input
                        {...register("phone", { required: true })}
                        placeholder="Enter your Phone Number"
                        rows="3"
                        type="number"
                        className="w-full px-4 py-2 rounded-lg border border-main focus:ring-2 focus:ring-main text-black"
                    ></input>
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">Phone Number is required</p>
                    )}
                </div>
                {/* Experience  */}
                <div className="">
                    <label className="block text-main font-semibold mb-2">Experience</label>
                    <input
                        type="number"
                        {...register("experience", { required: true })}
                        placeholder="How many years have you experience"
                        className="w-full px-4 py-2 rounded-lg border border-main focus:ring-2 focus:ring-main text-black"
                    ></input>
                    {errors.experience && (
                        <p className="text-red-500 text-sm mt-1">Experience is required</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-center">
                    <button
                        type="submit"
                        disabled={photoLoading}
                        className={`px-10 py-3 rounded-lg bg-main hover:bg-main/80  font-bold shadow-md transition cursor-pointer hover:scale-105 transform text-white ${photoLoading && 'bg-amber-800'}`}
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BeATrainer;
