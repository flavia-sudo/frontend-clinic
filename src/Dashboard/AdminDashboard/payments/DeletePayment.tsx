import { toast } from "sonner";
import { paymentAPI, type TPayment } from "../../../features/paymentAPI";

type DeletePaymentProps = {
    payment: TPayment | null;
};

const DeletePayment = ({ payment }: DeletePaymentProps) => {
    const [deletePayment, { isLoading }] = paymentAPI.useDeletePaymentMutation();

    const handleDelete = async () => {
        try {
            if (!payment) {
                toast.error("No payment selected for deletion.");
                return;
            }

            const response = await deletePayment(payment.paymentId);
            console.log("Payment deleted successfully", response);
            toast.success("Payment deleted successfully!");
        } catch (error) {
            console.error("Error deleting payment:", error);
            toast.error("Failed to delete payment. Please try again.");
        }
    };

    return (
        <dialog id="delete_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Delete Payment</h3>
                <p className="py-4">Are you sure you want to delete this payment?</p>
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

export default DeletePayment;