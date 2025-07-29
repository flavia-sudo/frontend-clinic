import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { transactionsAPI } from "../../../features/transactionAPI";

type CreateTransactionInputs = {
    userId: number;
    transactionName: string;
    amount: number;
    status: boolean;
};

const schema = yup.object({
    userId: yup.number().required("User ID is required"),
    transactionName: yup.string().required("Transaction Name is required"),
    amount: yup.number().required("Amount is required"),
    status: yup.boolean().required("Status is required"),
});

const CreateTransaction = () => {
    const { register, handleSubmit, reset, formState: {errors}} = useForm<CreateTransactionInputs>({
        resolver: yupResolver(schema),
    });

    const [CreateTransaction, { isLoading }] = transactionsAPI.useCreateTransactionMutation();
    const onSubmit: SubmitHandler<CreateTransactionInputs> = async (data) => {
        try {
            await CreateTransaction(data).unwrap();
            toast.success("Transaction created successfully");
            reset();
            (document.getElementById("create_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            toast.error("Failed to create transaction");
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
                <h3 className="font-bold text-xl mb-4 text-gray-800">Create Transaction</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            User ID
                        </label>
                        <input type="number" {...register("userId")} className="input input-bordered w-full max-w-xs" />
                        {errors.userId && <span className="text-red-500">{errors.userId.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transaction Name
                        </label>
                        <input type="text" {...register("transactionName")} className="input input-bordered w-full max-w-xs" />
                        {errors.transactionName && <span className="text-red-500">{errors.transactionName.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input type="number" {...register("amount")} className="input input-bordered w-full max-w-xs" />
                        {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        {...register("status")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="true">Pending</option>
                        <option value="false">Confirmed</option>
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
                        {isLoading ? "Creating..." : "Create Transaction"}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
};

export default CreateTransaction;