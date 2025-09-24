import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../../custom hooks/UseAuth";
import axios from "axios";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import imageCompression from "browser-image-compression";

const ProfileUpdate = () => {
    const { user, updateUserProfile } = UseAuth();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const secureAxios = useSecureAxios();



    // handle submit
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            console.log(data.photo[0])
            let photoURL = user?.photoURL;

            // যদি নতুন image select করা হয়
            if (data.photo[0]) {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 600,
                    useWebWorker: true,
                }
                const file = data.photo[0];
                const compressedFile = await imageCompression(file, options);

                const formData = new FormData();
                formData.append("image", compressedFile);
                formData.append("name", file.name);
                await axios.post(`https://api.imgbb.com/1/upload?key=6ab62bb4d9a2890c9cfc80752bf4bb20`, formData)
                    .then((data) => {
                        photoURL = data.data.data.url
                    });
            }

            console.log(photoURL)

            await updateUserProfile({
                displayName: data.name,
                photoURL,
            });

            await secureAxios.patch(`/users/updateProfile/${user.email}` , {
                displayName: data.name,
                photoURL,
            })
            reset();
            Swal.fire("Success", "Profile updated successfully", "success");
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-main mb-6">Update Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        defaultValue={user?.displayName}
                        {...register("name")}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Email (read-only) */}
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Profile Picture Upload */}
                <div>
                    <label className="block mb-1 font-semibold">Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("photo")}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                {/* Last Login */}
                <div>
                    <label className="block mb-1 font-semibold">Last Login</label>
                    <input
                        type="text"
                        value={new Date(user?.metadata?.lastSignInTime).toLocaleString() || "N/A"}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn bg-main text-white w-full"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default ProfileUpdate;
