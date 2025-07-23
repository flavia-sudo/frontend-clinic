import { toast } from "sonner";
import { complaintsAPI, type TComplaint } from "../../../features/complaintAPI";

type DeleteComplaintProps = {
    complaint: TComplaint | null;
};

const DeleteComplaint = ({ complaint }: DeleteComplaintProps) => {
    const [deleteComplaint, { isLoading }] = complaintsAPI.useDeleteComplaintMutation();

    const handleDelete = async () => {
        try {
            if (!complaint) {
                toast.error("No complaint selected for deletion.");
                return;
            }

            const response = await deleteComplaint(complaint.complaintId);
            console.log("Complaint deleted successfully", response);
            toast.success("Complaint deleted successfully!");
        } catch (error) {
            console.error("Error deleting complaint:", error);
            toast.error("Failed to delete complaint. Please try again.");
        }
    };

    return (
        <dialog id="delete_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Delete Complaint</h3>
                <p className="py-4">Are you sure you want to delete this complaint?</p>
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

export default DeleteComplaint;