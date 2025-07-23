import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { complaintsAPI } from "../../../features/complaintAPI";

type CreateComplaintInputs = {
    userId: number;
    appointmentId: number;
    subject: string;
    description: string;
    status: string;
};

const schema = yup.object({
    userId: yup.number().required("User ID is required"),
    appointmentId: yup.number().required("Appointment ID is required"),
    subject: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
    status: yup.string().required("Status is required"),
});

const CreateComplaints = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateComplaintInputs>({
        resolver: yupResolver(schema),
    });

    const [CreateComplaint, { isLoading }] = complaintsAPI.useCreateComplaintMutation();

    const onSubmit: SubmitHandler<CreateComplaintInputs> = async (data) => {
        try {
            await CreateComplaint(data).unwrap();
            toast.success("Complaint created successfully!");
            reset();
            (document.getElementById("create_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            toast.error("Failed to create complaint.");
        }
    };

    return (
        <dialog id="create_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Create Complaint</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">User ID</span>
                        </label>
                        <input type="text" {...register("userId")} className="input input-bordered w-full max-w-xs" />
                        {errors.userId && <span className="text-red-500">{errors.userId.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Appointment ID</span>
                        </label>
                        <input type="text" {...register("appointmentId")} className="input input-bordered w-full max-w-xs" />
                        {errors.appointmentId && <span className="text-red-500">{errors.appointmentId.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Subject</span>
                        </label>
                        <input type="text" {...register("description")} className="input input-bordered w-full max-w-xs" />
                        {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Description</span>
                        </label>
                        <input type="text" {...register("description")} className="input input-bordered w-full max-w-xs" />
                        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Status</span>
                        </label>
                        <input type="text" {...register("status")} className="input input-bordered w-full max-w-xs" />
                        {errors.status && <span className="text-red-500">{errors.status.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-4 text-white">Status</span>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="true"
                                        {...register("status")}
                                        className="radio radio-primary text-green-400"
                                    />
                                    Open
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        {...register("status")}
                                        className="radio radio-primary  text-yellow-400"
                                        defaultChecked
                                    />
                                    In Progress
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        {...register("status")}
                                        className="radio radio-primary  text-yellow-400"
                                        defaultChecked
                                    />
                                    Resolved
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        {...register("status")}
                                        className="radio radio-primary  text-yellow-400"
                                        defaultChecked
                                    />
                                    Closed
                                </label>
                            </div>
                        </label>
                    </div>
                    {errors.status && (
                        <span className="text-sm text-red-700">{errors.status.message}</span>
                    )}
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create"}
                        </button>
                        <button type="button" className="btn" onClick={() => (document.getElementById("update_modal") as HTMLDialogElement)?.close()}>
                        Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
};

export default CreateComplaints;