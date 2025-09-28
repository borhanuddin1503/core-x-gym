import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import UseAuth from "../../../custom hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading/Loading";

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
    { value: "Morning", label: "Morning" },
    { value: "After Noon", label: "After Noon" },
    { value: "Night", label: "Night" },
];

const AddSlot = () => {
    const { user } = UseAuth();
    const secureAxios = useSecureAxios();
    const { handleSubmit, control, reset } = useForm();


    // fetch classes
    const { data: classOptions = [], isLoading, error } = useQuery({
        queryKey: ['classesWOT'],
        queryFn: async () => {
            const res = await secureAxios('/classes/withoutTrainers');
            console.log(res.data)
            return res.data.map(cls => ({
                value: cls.name,
                label: cls.name,
                classId: cls._id,
            }));
        }
    })

    const onSubmit = async (data) => {
        const newSlot = {
            className: data.className.value,
            classId: data.className.classId,
            availableDays: data.availableDays.map((d) => d.value),
            availableTimes: data.availableTimes.value,
        };

        console.log(newSlot)

        try {
            const res = await secureAxios.patch(`/trainers/${user.email}/slots/add`, newSlot);
            if (res.data.success) {
                Swal.fire("Success", "Slot added successfully!", "success");
                reset();
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };


    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow ">
            <h2 className="font-bold mb-4 text-main text-2xl">Add New Slot</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Class Name (Single Select) */}
                <div>
                    <label className="block font-medium mb-1 text-black">Class Name</label>
                    <Controller
                        name="className"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={classOptions}
                                placeholder="Select class..."
                            />
                        )}
                    />
                </div>

                {/* Available Days (Multi Select) */}
                <div>
                    <label className="block font-medium mb-1 text-black">Available Days</label>
                    <Controller
                        name="availableDays"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={daysOptions}
                                isMulti
                                placeholder="Select days..."
                            />
                        )}
                    />
                </div>

                {/* Available Times (Multi Select) */}
                <div>
                    <label className="block font-medium mb-1 text-black">Available Times</label>
                    <Controller
                        name="availableTimes"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={timeOptions}
                                placeholder="Select times..."
                            />
                        )}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-main text-white px-4 py-2 rounded hover:bg-main/80"
                >
                    Add Slot
                </button>
            </form>
        </div>
    );
};

export default AddSlot;
