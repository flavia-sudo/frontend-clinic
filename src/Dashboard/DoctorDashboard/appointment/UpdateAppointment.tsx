import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { appointmentsAPI, type TAppointment } from "../../../features/appointmentAPI";

type UpdateAppointmentProps = {
    appointment: TAppointment | null;
};

type UpdateAppointmentInputs = {
    userId: number;
    doctorId: number;
    appointmentDate: string;
    time: string;
    totalAmount: number;
    status: string;
};

const schema = yup.object({
    userId: yup.number().required("User ID is required"),
    doctorId: yup.number().required("Doctor ID is required"),
    appointmentDate: yup.string().required("Appointment date is required"),
    time: yup.string().required("Time is required"),
    totalAmount: yup.number().required("Total amount is required"),
    status: yup.string().required("Status is required"),
});

const UpdateAppointment = ({ appointment }: UpdateAppointmentProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<UpdateAppointmentInputs>({
        resolver: yupResolver(schema),
    });

    const [updateAppointment, { isLoading }] = appointmentsAPI.useUpdateAppointmentMutation();

    useEffect(() => {
        if (appointment) {
            setValue("userId", appointment.userId);
            setValue("doctorId", appointment.doctorId);
            setValue("appointmentDate", appointment.appointmentDate);
            setValue("time", appointment.time);
            setValue("totalAmount", appointment.totalAmount);
            setValue("status", appointment.status);
        } else {
            reset();
        }
    }, [appointment, setValue, reset]);

    const onSubmit: SubmitHandler<UpdateAppointmentInputs> = async (data) => {
        try {
            if (!appointment) {
                toast.error("No appointment selected for update.");
                return;
            }

            const response = await updateAppointment({ appointmentId: appointment.appointmentId, ...data });
            console.log("Appointment updated successfully", response);
            toast.success("Appointment updated successfully!");
            reset();
            (document.getElementById("update_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error updating appointment:", error);
            toast.error("Failed to update appointment. Please try again.");
        }
    };

    return (
        <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg position-absolute top-10">
                <h3 className="font-bold text-lg">Update Appointment</h3>
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
                            <span className="label-text text-white">Doctor ID</span>
                        </label>
                        <input type="text" {...register("doctorId")} className="input input-bordered w-full max-w-xs" />
                        {errors.doctorId && <span className="text-red-500">{errors.doctorId.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Appointment Date</span>
                        </label>
                        <input type="text" {...register("appointmentDate")} className="input input-bordered w-full max-w-xs" />
                        {errors.appointmentDate && <span className="text-red-500">{errors.appointmentDate.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Time</span>
                        </label>
                        <input type="text" {...register("time")} className="input input-bordered w-full max-w-xs" />
                        {errors.time && <span className="text-red-500">{errors.time.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Total Amount</span>
                        </label>
                        <input type="text" {...register("totalAmount")} className="input input-bordered w-full max-w-xs" />
                        {errors.totalAmount && <span className="text-red-500">{errors.totalAmount.message}</span>}
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
                                    Pending
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        {...register("status")}
                                        className="radio radio-primary  text-yellow-400"
                                        defaultChecked
                                    />
                                    Confirmed
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        {...register("status")}
                                        className="radio radio-primary  text-yellow-400"
                                        defaultChecked
                                    />
                                    Cancelled
                                </label>
                            </div>
                        </label>
                    </div>
                    {errors.status && (
                        <span className="text-sm text-red-700">{errors.status.message}</span>
                    )}
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                             {isLoading ? "Updating..." : "Update"}
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

export default UpdateAppointment;