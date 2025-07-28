import { toast } from "sonner";
import { usersAPI, type TUser } from "../../../features/userAPI";

type DeleteDoctorProps = {
  doctor: TUser | null;
};

const DeleteDoctor = ({ doctor }: DeleteDoctorProps) => {
  const [deleteUser, { isLoading }] = usersAPI.useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      if (!doctor) {
        toast.error("No doctor selected for deletion.");
        return;
      }

      await deleteUser(doctor.userId).unwrap();
      toast.success("Doctor deleted successfully!");
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor. Please try again.");
    }
  };

  return (
    <dialog id="delete_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg">Delete Doctor</h3>
        <p className="py-4">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            Dr. {doctor?.firstName} {doctor?.lastName}
          </span>
          ?
        </p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="btn"
            onClick={() =>
              (document.getElementById("delete_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteDoctor;
