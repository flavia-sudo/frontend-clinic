import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { appointmentsAPI } from "../../../features/appointmentAPI";

type CreateAppointmentInputs = {
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

const CreateAppointments = () => {
    const [CreateAppointment, { isLoading }] = appointmentsAPI.useCreateAppointmentMutation();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateAppointmentInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateAppointmentInputs> = async (data) => {
        try {
            await CreateAppointment(data).unwrap();
            toast.success("Appointment created successfully!");
            reset();
            (document.getElementById("create_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            toast.error("Failed to create appointment.");
        }
    };

    return (
        <dialog id="create_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Create Appointment</h3>
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

export default CreateAppointments;