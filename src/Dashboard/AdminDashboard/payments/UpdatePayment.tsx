import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { paymentAPI, type TPayment } from "../../../features/paymentAPI";

type UpdatePaymentProps = {
    payment: TPayment | null;
};

type UpdatePaymentInputs = {
    appointmentId: number;
    amount: number;
    status: boolean;
    transactionId: number;
    paymentDate: string;
};

const schema = yup.object({
    appointmentId: yup.number().required("Appointment ID is required"),
    amount: yup.number().required("Amount is required"),
    status: yup.boolean().required("Status is required"),
    transactionId: yup.number().required("Transaction ID is required"),
    paymentDate: yup.string().required("Payment date is required"),
});

const UpdatePayment = ({ payment }: UpdatePaymentProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<UpdatePaymentInputs>({
        resolver: yupResolver(schema),
    });

    const [UpdatePayment, { isLoading }] = paymentAPI.useUpdatePaymentMutation();

    useEffect(() => {
        if (payment) {
            setValue("appointmentId", payment.appointmentId);
            setValue("amount", payment.amount);
            setValue("status", payment.status);
            setValue("transactionId", payment.transactionId);
            setValue("paymentDate", payment.paymentDate);
        } else {
            reset();
        }
    }, [payment, reset, setValue]);

    const onSubmit: SubmitHandler<UpdatePaymentInputs> = async (data) => {
        try {
            if (!payment) {
                toast.error("No payment selected for update.");
                return;
            }

            const response = await UpdatePayment({ paymentId: payment.paymentId, ...data });
            console.log("Payment updated successfully", response);
            toast.success("Payment updated successfully!");
            reset();
            (document.getElementById("update_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error updating payment:", error);
            toast.error("Failed to update payment. Please try again.");
        }
    };

    return (<dialog id="create_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Create Appointment</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Appointment ID</span>
                        </label>
                        <input type="text" {...register("appointmentId")} className="input input-bordered w-full max-w-xs" />
                        {errors.appointmentId && <span className="text-red-500">{errors.appointmentId.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Amount</span>
                        </label>
                        <input type="text" {...register("amount")} className="input input-bordered w-full max-w-xs" />
                        {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Transaction ID</span>
                        </label>
                        <input type="text" {...register("transactionId")} className="input input-bordered w-full max-w-xs" />
                        {errors.transactionId && <span className="text-red-500">{errors.transactionId.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Payment Date</span>
                        </label>
                        <input type="text" {...register("paymentDate")} className="input input-bordered w-full max-w-xs" />
                        {errors.paymentDate && <span className="text-red-500">{errors.paymentDate.message}</span>}
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

export default UpdatePayment;