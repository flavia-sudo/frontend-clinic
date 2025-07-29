import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { paymentAPI } from "../../../features/paymentAPI";

type CreatePaymentInputs = {
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

const CreatePayments = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatePaymentInputs>({
        resolver: yupResolver(schema),
    });

    const [CreatePayment, { isLoading }] = paymentAPI.useCreatePaymentMutation();

    const onSubmit: SubmitHandler<CreatePaymentInputs> = async (data) => {
        try {
            await CreatePayment(data).unwrap();
            toast.success("Payment created successfully");
            reset();
            (document.getElementById("create_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            toast.error("Failed to create payment");
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
                <h3 className="font-bold text-xl mb-4 text-gray-800">Create Appointment</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Appointment ID
                        </label>
                        <input type="number" {...register("appointmentId")} className="input input-bordered w-full max-w-xs" />
                        {errors.appointmentId && <span className="text-red-500 text-xs">{errors.appointmentId.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input type="number" step="0.01" {...register("amount")} className="input input-bordered w-full max-w-xs" />
                        {errors.amount && <span className="text-red-500 text-xs">{errors.amount.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transaction ID
                        </label>
                        <input type="number" {...register("transactionId")} className="input input-bordered w-full max-w-xs" />
                        {errors.transactionId && <span className="text-red-500 text-xs">{errors.transactionId.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Payment Date
                        </label>
                        <input type="date" {...register("paymentDate")} className="input input-bordered w-full max-w-xs" />
                        {errors.paymentDate && <span className="text-red-500 text-xs">{errors.paymentDate.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <input
                        type="text"
                        placeholder="e.g. pending"
                        {...register("status")}
                        className="input input-bordered w-full"
                        />
                        {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
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
                        {isLoading ? "Creating..." : "Create Appointment"}
                        </button>
                    </div>
                    </form>
            </div>
        </dialog>
    )
};

export default CreatePayments;