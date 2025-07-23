import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { transactionsAPI, type TTransaction } from "../../../features/transactionAPI";

type UpdateTransactionProps = {
    transaction: TTransaction | null;
};

type UpdateTransactionInputs = {
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

const UpdateTransaction = ({ transaction }: UpdateTransactionProps) => {
    const { register, handleSubmit, reset, setValue, formState:{ errors }} = useForm<UpdateTransactionInputs>({
        resolver: yupResolver(schema),
    });
    const [updateTransaction, { isLoading }] = transactionsAPI.useUpdateTransactionMutation();

    useEffect(() => {
        if (transaction) {
            setValue("userId", transaction.userId);
            setValue("transactionName", transaction.transactionName);
            setValue("amount", transaction.amount);
            setValue("status", transaction.status);
        } else {
            reset();
        }
    }, [transaction, reset, setValue]);

    const onSubmit: SubmitHandler<UpdateTransactionInputs> = async (data) => {
        try {
            if (!transaction) {
                toast.error("No transaction selected for update.");
                return;
            }
            await updateTransaction({ transactionId: transaction.transactionId, ...data});
            toast.success("Transaction updated successfully!");
            reset();
            (document.getElementById("update_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            toast.error("Failed to update transaction.");
        }
    };
    
    return (
        <dialog id="create_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Create Transaction</h3>
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
                            <span className="label-text text-white">Transaction Name</span>
                        </label>
                        <input type="text" {...register("transactionName")} className="input input-bordered w-full max-w-xs" />
                        {errors.transactionName && <span className="text-red-500">{errors.transactionName.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Amount</span>
                        </label>
                        <input type="text" {...register("amount")} className="input input-bordered w-full max-w-xs" />
                        {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
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

export default UpdateTransaction;