import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useSecureAxios from "../../../../services/Axios/SecureAxios/useSecureAxios";
import Loading from "../../../../shared/Loading/Loading";
import axios from "axios";
import imageCompression from "browser-image-compression";

const AddClassForm = () => {
    const axiosSecure = useSecureAxios();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const [photoURL, setPhotoURL] = useState('');
    const [photoLoading, setPhotoLoading] = useState(false);

    console.log(photoURL)

    // Fetch trainers using React Query
    const { data: trainers = [], isLoading, error } = useQuery({
        queryKey: ["trainersOptions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/trainers");
            return res.data.map(trainer => ({
                value: trainer.id || trainer._id,
                label: trainer.fullName,
                ...trainer
            }));
        }
    });

    const categoryOptions = [
        { value: 'Weightlifting', label: 'Weightlifting' },
        { value: 'Cardio', label: 'Cardio' },
        { value: 'Yoga', label: 'Yoga' },
        { value: 'CrossFit', label: 'CrossFit' },
        { value: 'Bodybuilding', label: 'Bodybuilding' },
        { value: 'Strength Training', label: 'Strength Training' },
        { value: 'Zumba', label: 'Zumba' }
    ]

    const scheduleOptions = [
        { value: '8 AM to 1PM', label: '8 AM to 1PM' },
        { value: '1 PM to 4PM', label: '1 PM to 4PM' },
        { value: '4 PM to 8PM', label: '4 AM to 8PM' },
    ]


    // handle photo change
    const handlePhotoChange = async (e) => {
        try {
            setPhotoLoading(true)
            const file = e.target.files[0];

            if (file) {
                const options = {
                    maxSizeMB: 5,
                    maxWidthOrHeight: 600,
                    useWebWorker: true,
                }
                const compressedFile = await imageCompression(file, options);

                const formData = new FormData();
                formData.append("image", compressedFile);
                formData.append("name", file.name);
                console.log(Object.fromEntries(formData));
                await axios.post(`https://api.imgbb.com/1/upload?key=6ab62bb4d9a2890c9cfc80752bf4bb20`, formData)
                    .then((data) => {
                        setPhotoURL(data.data.data)
                    });
            }
        } finally {
            setPhotoLoading(false);
        }
    }


    // mutation function
    const classMutation = useMutation({
        mutationFn: async (classInfo) => {
            const res = await axiosSecure.post('/classes', classInfo);
        },
        onSuccess: () => { Swal.fire('Success', 'Class Added Successfully', "success") },
        onError: () => { Swal.fire('Error', 'Something went wrong', 'error') }
    })


    // handle submit
    const onSubmit = async (data) => {
        const finalData = {
            ...data,
        category: data.category.value,
            image: photoURL.url
        }
        classMutation.mutate(finalData)
    }
    if (isLoading) return <Loading></Loading>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-main">Add New Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block font-medium mb-1">Class Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("name", { required: true })}
                    />
                </div>

                {/* Image */}
                <div>
                    <label htmlFor="" className="block text-main font-semibold mb-2 ">
                        Image
                    </label>
                    <label
                        className="w-full block px-4 py-2 rounded-lg border border-main focus:ring-2 focus:ring-main text-black"
                        htmlFor="profile"
                    >
                        {photoLoading ? <div className="flex items-center justify-center"><span className="loading loading-spinner text-warning"></span></div> : photoURL ? `profile: ${photoURL.image.name}` : 'Choose Photo'}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="profile"
                        {...register("image", { required: true, onChange: handlePhotoChange })}
                        className="hidden"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            Select  Class  Image
                        </p>
                    )}
                </div>

                {/* description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        {...register("description", { required: true })}
                    />
                </div>


                {/* category */}
                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categoryOptions}
                                className="w-full"
                            />
                        )}
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-main w-full mt-4">
                        Add Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClassForm;
