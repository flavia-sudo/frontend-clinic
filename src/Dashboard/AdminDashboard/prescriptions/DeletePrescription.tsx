import { toast } from "sonner";
import { prescriptionAPI, type TPrescription } from "../../../features/prescriptionAPI";

type DeletePrescriptionProps = {
    prescription: TPrescription | null;
};

const DeletePrescription = ({ prescription }: DeletePrescriptionProps) => {
    const [deletePrescription, { isLoading }] = prescriptionAPI.useDeletePrescriptionMutation();

    const handleDelete = async () => {
        try {
            if (!prescription) {
                toast.error("No prescription selected for deletion.");
                return;
            }
            await deletePrescription(prescription.prescriptionId);
            toast.success("Prescription deleted successfully");
        } catch (error) {
            toast.error("Failed to delete prescription");
        }
    }

    return (
        <dialog id="delete_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Delete Prescription</h3>
                <p className="py-4">Are you sure you want to delete this prescription?</p>
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

export default DeletePrescription;