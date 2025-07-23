import { toast } from "sonner";
import { transactionsAPI, type TTransaction } from "../../../features/transactionAPI";

type DeleteTransactionProps = {
    transaction: TTransaction | null;
};

const DeleteTransaction = ({ transaction }: DeleteTransactionProps) => {
    const [deleteTransaction, { isLoading }] = transactionsAPI.useDeleteTransactionMutation();

    const handleDelete = async () => {
        try {
            if (!transaction) {
                toast.error("No transaction selected for deletion.");
                return;
            }
            await deleteTransaction(transaction.transactionId);
            toast.success("Transaction deleted successfully");
        } catch (error) {
            toast.error("Failed to delete transaction");
        }
    }

    return (
        <dialog id="delete_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Delete Transaction</h3>
                <p className="py-4">Are you sure you want to delete this transaction?</p>
                <div className="modal-action">
                    <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                    <button className="btn" onClick={() => (document.getElementById("delete_modal") as HTMLDialogElement)?.close()}>
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteTransaction;