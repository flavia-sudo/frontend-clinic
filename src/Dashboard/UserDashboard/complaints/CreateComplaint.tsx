import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { complaintsAPI } from "../../../features/complaintAPI";
import { usersAPI } from "../../../features/userAPI"; // add your actual users API
import { appointmentsAPI } from "../../../features/appointmentAPI"; // add your actual appointments API

type CreateComplaintInputs = {
  userId: number;
  appointmentId: number;
  subject: string;
  description: string;
  isPending: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const schema = yup.object({
  userId: yup.number().required("User ID is required"),
  appointmentId: yup.number().required("Appointment ID is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
  isPending: yup.boolean().required("Status is required"),
  createdAt: yup.date().default(() => new Date()),
  updatedAt: yup.date().default(() => new Date()),
});

const CreateComplaints = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateComplaintInputs>({
    resolver: yupResolver(schema),
  });

  const [CreateComplaint, { isLoading }] = complaintsAPI.useCreateComplaintMutation();
  const { data: users } = usersAPI.useGetUsersQuery(); // ensure this exists
  const { data: appointments } = appointmentsAPI.useGetAppointmentsQuery(); // ensure this exists

  const onSubmit: SubmitHandler<CreateComplaintInputs> = async (data) => {
    try {
      await CreateComplaint(data).unwrap();
      toast.success("Complaint created successfully!");
      reset();
      (document.getElementById("create_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      toast.error("Failed to create complaint.");
    }
  };

  const handleClose = () => {
    (document.getElementById("create_modal") as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="create_modal" className="fixed inset-0 z-50 bg-transparent">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-50">
        <h3 className="font-bold text-xl mb-4 text-gray-800 text-center">Create Complaint</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* User ID Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
            <select {...register("userId")} className="select select-bordered w-full">
              <option value="">Select a user</option>
              {users?.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            {errors.userId && <p className="text-red-500 text-xs">{errors.userId.message}</p>}
          </div>

          {/* Appointment ID Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Appointment</label>
            <select {...register("appointmentId")} className="select select-bordered w-full">
              <option value="">Select an appointment</option>
              {appointments?.map((appt) => (
                <option key={appt.appointmentId} value={appt.appointmentId}>
                  Appointment #{appt.appointmentId} - {appt.date}
                </option>
              ))}
            </select>
            {errors.appointmentId && <p className="text-red-500 text-xs">{errors.appointmentId.message}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              {...register("subject")}
              className="input input-bordered w-full"
            />
            {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
          </div>

          {/* isPending */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isPending")}
              className="checkbox checkbox-primary"
            />
            <label className="text-sm text-gray-700">Is Pending?</label>
          </div>
          {errors.isPending && <p className="text-red-500 text-xs">{errors.isPending.message}</p>}

          {/* Buttons */}
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {isLoading ? "Creating..." : "Create Complaint"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateComplaints;
