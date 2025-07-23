import { toast } from "sonner";
import { appointmentsAPI, type TAppointment } from "../../../features/appointmentAPI";

type DeleteAppointmentProps = {
    appointment: TAppointment | null;
};

const DeleteAppointment = ({ appointment }: DeleteAppointmentProps) => {
    const [deleteAppointment, { isLoading }] = appointmentsAPI.useDeleteAppointmentMutation();

    const handleDelete = async () => {
        try {
            if (!appointment) {
                toast.error("No appointment selected for deletion.");
                return;
            }

            const response = await deleteAppointment(appointment.appointmentId);
            console.log("Appointment deleted successfully", response);
            toast.success("Appointment deleted successfully!");
        } catch (error) {
            console.error("Error deleting appointment:", error);
            toast.error("Failed to delete appointment. Please try again.");
        }
    };

    return (
        <dialog id="delete_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Delete Appointment</h3>
                <p className="py-4">Are you sure you want to delete this appointment?</p>
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

export default DeleteAppointment;