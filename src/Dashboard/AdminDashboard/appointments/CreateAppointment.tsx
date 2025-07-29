import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { appointmentsAPI } from "../../../features/appointmentAPI";
import { usersAPI, type TUser } from "../../../features/userAPI"; // import user API

type CreateAppointmentInputs = {
  userId: number;
  doctorId: number;
  appointmentDate: string;
  time: string;
  totalAmount: number;
  status: string;
};

const schema = yup.object({
  userId: yup.number().required("User ID is required"),
  doctorId: yup.number().required("Doctor is required"),
  appointmentDate: yup.string().required("Appointment date is required"),
  time: yup.string().required("Time is required"),
  totalAmount: yup.number().required("Total amount is required"),
  status: yup.string().required("Status is required"),
});

const CreateAppointments = () => {
  const [CreateAppointment, { isLoading }] = appointmentsAPI.useCreateAppointmentMutation();

  const { data: doctorsData, isLoading: loadingDoctors } = usersAPI.useGetDoctorsQuery(); // ✅ fetch doctors

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateAppointmentInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateAppointmentInputs> = async (data) => {
    try {
      await CreateAppointment(data).unwrap();
      toast.success("Appointment created successfully!");
      reset();
      (document.getElementById("create_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      toast.error("Failed to create appointment.");
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
        <h3 className="font-bold text-xl mb-4 text-gray-800 text-center">Create Appointment</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* User ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <input
              type="number"
              {...register("userId")}
              className="input input-bordered w-full"
            />
            {errors.userId && <p className="text-red-500 text-xs">{errors.userId.message}</p>}
          </div>

          {/* Doctor Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
            <select
              {...register("doctorId")}
              className="select select-bordered w-full"
              disabled={loadingDoctors}
            >
              <option value="">-- Choose a Doctor --</option>
              {doctorsData?.map((doctor: TUser) => (
                <option key={doctor.userId} value={doctor.userId}>
                  Dr. {doctor.firstName} {doctor.lastName} ({doctor.specialization})
                </option>
              ))}
            </select>
            {errors.doctorId && <p className="text-red-500 text-xs">{errors.doctorId.message}</p>}
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
            <input
              type="date"
              {...register("appointmentDate")}
              className="input input-bordered w-full"
            />
            {errors.appointmentDate && <p className="text-red-500 text-xs">{errors.appointmentDate.message}</p>}
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              {...register("time")}
              className="input input-bordered w-full"
            />
            {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
          </div>

          {/* Total Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("totalAmount")}
              className="input input-bordered w-full"
            />
            {errors.totalAmount && <p className="text-red-500 text-xs">{errors.totalAmount.message}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
                {...register("status")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
                <option value="true">Confirmed</option>
                <option value="false">Not Confirmed</option>
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
              {isLoading ? "Creating..." : "Create Appointment"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateAppointments;
