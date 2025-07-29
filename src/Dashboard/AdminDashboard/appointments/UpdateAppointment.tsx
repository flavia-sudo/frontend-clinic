import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { appointmentsAPI, type TAppointment } from "../../../features/appointmentAPI";

type UpdateAppointmentProps = {
  appointment: TAppointment | null;
};

type UpdateAppointmentInputs = {
  userId: number;
  doctorId: number;
  appointmentDate: string;
  time: string;
  totalAmount: number;
  status: boolean;
};

const schema = yup.object({
  userId: yup.number().required("User ID is required"),
  doctorId: yup.number().required("Doctor ID is required"),
  appointmentDate: yup.string().required("Appointment date is required"),
  time: yup.string().required("Time is required"),
  totalAmount: yup.number().required("Total amount is required"),
  status: yup.boolean().required("Status is required"),
});

const UpdateAppointment = ({ appointment }: UpdateAppointmentProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UpdateAppointmentInputs>({
    resolver: yupResolver(schema),
  });

  const [updateAppointment, { isLoading }] = appointmentsAPI.useUpdateAppointmentMutation();

  useEffect(() => {
    if (appointment) {
      setValue("userId", appointment.userId);
      setValue("doctorId", appointment.doctorId);
      setValue("appointmentDate", appointment.appointmentDate);
          // Safely extract just HH:mm from ISO or full datetime
        const parsedTime = new Date(`1970-01-01T${appointment.time}`);
        const formattedTime = parsedTime.toTimeString().slice(0, 5); // "14:30"
      setValue("time", formattedTime);
      setValue("totalAmount", appointment.totalAmount);
      setValue("status", appointment.isCompleted);
    } else {
      reset();
    }
  }, [appointment, setValue, reset]);

  const onSubmit: SubmitHandler<UpdateAppointmentInputs> = async (data) => {
    if (!appointment) {
      toast.error("No appointment selected for update.");
      return;
    }

    try {
      await updateAppointment({ appointmentId: appointment.appointmentId, ...data }).unwrap();
      toast.success("Appointment updated successfully!");
      reset();
      (document.getElementById("update_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment. Please try again.");
    }
  };

  const handleClose = () => {
    (document.getElementById("update_modal") as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="update_modal" className="fixed inset-0 z-50 bg-transparent">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-50">
        <h3 className="font-bold text-xl mb-4 text-gray-800">Update Appointment</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <input
              type="number"
              {...register("userId")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.userId && <span className="text-red-500 text-xs">{errors.userId.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
            <input
              type="number"
              {...register("doctorId")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.doctorId && <span className="text-red-500 text-xs">{errors.doctorId.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
            <input
              type="date"
              {...register("appointmentDate")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.appointmentDate && <span className="text-red-500 text-xs">{errors.appointmentDate.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              {...register("time")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.time && <span className="text-red-500 text-xs">{errors.time.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
            <input
              type="number"
              {...register("totalAmount")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.totalAmount && <span className="text-red-500 text-xs">{errors.totalAmount.message}</span>}
          </div>

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

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Appointment"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateAppointment;
