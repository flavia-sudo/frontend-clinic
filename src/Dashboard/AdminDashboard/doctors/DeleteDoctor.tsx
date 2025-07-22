import { toast } from "sonner";
import { doctorsAPI, type TDoctor } from "../../../features/doctors/doctorsAPI";

type DeleteDoctorProps = {
    doctor: TDoctor | null;
};

const DeleteDoctor = ({ doctor }: DeleteDoctorProps) => {
    const [deleteDoctor, { isLoading }] = doctorsAPI.useDeleteDoctorMutation();

    const handleDelete = async () => {
        try {
            if (!doctor) {
                toast.error("No doctor selected for deletion.");
                return;
            }

            const response = await deleteDoctor(doctor.doctorId);
            console.log("Doctor deleted successfully", response);
            toast.success("Doctor deleted successfully!")
        } catch (error) {
            console.error("Error deleting doctor:", error);
            toast.error("Failed to delete doctor. Please try again.")
        }
    };

    return (
        <dialog id="delete_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Delete Doctor</h3>
                <p className="py-4">Are you sure you want to delete this doctor?</p>
                <div className="modal-action">
                    <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                    <button className="btn" onClick={() => (document.getElementById("delete_modal") as HTMLDialogElement)?.close()}>Cancel</button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteDoctor;