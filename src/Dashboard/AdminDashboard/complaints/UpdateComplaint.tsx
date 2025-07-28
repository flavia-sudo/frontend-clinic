import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { complaintsAPI, type TComplaint } from "../../../features/complaintAPI";

type UpdateComplaintProps = {
    complaint: TComplaint | null;
};

type UpdateComplaintInputs = {
    userId: number;
    appointmentId: number;
    subject: string;
    description: string;
    status: boolean;
};

const schema = yup.object({
    userId: yup.number().required("User ID is required"),
    appointmentId: yup.number().required("Appointment ID is required"),
    subject: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
    status: yup.boolean().required("Status is required"),
});

const UpdateComplaint = ({ complaint }: UpdateComplaintProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateComplaintInputs>({
        resolver: yupResolver(schema),
    });

    const [updateComplaint, { isLoading }] = complaintsAPI.useUpdateComplaintMutation();

    useEffect(() => {
        if (complaint) {
            setValue("userId", complaint.userId);
            setValue("appointmentId", complaint.appointmentId);
            setValue("subject", complaint.subject);
            setValue("description", complaint.description);
            setValue("status", complaint.status);
        } else {
            reset();
        }
    }, [complaint, reset, setValue]);

    const onSubmit: SubmitHandler<UpdateComplaintInputs> = async (data) => {
        try {
            if (!complaint) {
                toast.error("No complaint selected for update.");
                return;
            }

            const response = await updateComplaint({ complaintId: complaint.complaintId, ...data });
            console.log("Complaint updated successfully", response);
            toast.success("Complaint updated successfully!");
            reset();
            (document.getElementById("update_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error updating complaint:", error);
            toast.error("Failed to update complaint. Please try again.");
        }
    };

    const handleClose = () => {
    ;(document.getElementById('create_modal') as HTMLDialogElement)?.close()
  }

    return (
        <dialog id="create_modal" className="fixed inset-0 z-50 bg-transparent">
        <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        ></div>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-50">
                <h3 className="font-bold text-xl mb-4 text-gray-800">Create Complaint</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        User ID
                        </label>
                        <input type="number" {...register("userId")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.userId && <span className="text-red-500 text-xs mt-1">{errors.userId.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Appointment ID
                        </label>
                        <input type="number" {...register("appointmentId")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.appointmentId && <span className="text-red-500 text-xs mt-1">{errors.appointmentId.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                        </label>
                        <input type="text" {...register("description")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.subject && <span className="text-red-500 text-xs mt-1">{errors.subject.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                        </label>
                        <input type="text" {...register("description")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        {...register("status")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="true">Pending</option>
                        <option value="false">Solved</option>
                    </select>
                    {errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
                    </div>
                    {/* Action buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                        onClick={handleClose}
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        >
                        {isLoading ? "Updating..." : "Update Complaint"}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
};

export default UpdateComplaint;