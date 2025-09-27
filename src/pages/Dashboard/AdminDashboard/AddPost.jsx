import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UseAuth from "../../../custom hooks/UseAuth";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import Swal from "sweetalert2";
import useUserRole from "../../../custom hooks/useUserRole";
import Loading from "../../../shared/Loading/Loading";

const AddPost = () => {
    const { user } = UseAuth();
    const secureAxios = useSecureAxios();

    const {role , roleLoading} = useUserRole();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();

    // handle submit
    const onSubmit = async (data) => {
        try {
            const postData = {
                title: data.title,
                content: data.content,
                likes: [],
                unLikes: [],
                authInfo: {
                    authName: user.displayName,
                    authEmail: user.email,
                    authProfile: user.photoURL,
                    role
                },
                createdAt: new Date(),
            };

            const res = await secureAxios.post("/posts", postData);
            if (res.data.insertedId) {
                reset();
                Swal.fire('Success', 'Post Addeded successfully', 'success')
            }
        } catch (err) {
            Swal.fire('Error', 'SomeThing Went Wrong', 'error')

        }
    };

    if(roleLoading){
        return <Loading></Loading>
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-main">
                ✍️ Create a New Post
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-main font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        placeholder="Enter Post Title"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main text-black outline-none"
                    />
                    {errors?.title && (
                        <p className="text-red-500 text-sm mt-1">⚠ Title is required</p>
                    )}
                </div>

                {/* Content */}
                <div>
                    <label className="block text-main font-semibold mb-2">Content</label>
                    <textarea
                        {...register("content", { required: true })}
                        placeholder="Write your content here..."
                        rows={6}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main text-black outline-none"
                    ></textarea>
                    {errors?.content && (
                        <p className="text-red-500 text-sm mt-1">⚠ Content is required</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-main hover:bg-main/90 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
                >
                    🚀 Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
