import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { usersAPI, type TUser } from "../../../features/userAPI";

type UpdateDoctorProps = {
  doctor: TUser | null;
};

type UpdateDoctorInputs = {
  firstName: string;
  lastName: string;
  specialization: string;
  contactPhone: string;
  availableDays: string;
};

const schema = yup.object({
  firstName: yup.string().max(50).required("First name is required"),
  lastName: yup.string().max(50).required("Last name is required"),
  specialization: yup.string().max(50).required("Specialization is required"),
  contactPhone: yup.string().max(50).required("Contact phone is required"),
  availableDays: yup.string().max(50).required("Available days is required"),
});

const UpdateDoctor = ({ doctor }: UpdateDoctorProps) => {
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateDoctorInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (doctor) {
      setValue("firstName", doctor.firstName);
      setValue("lastName", doctor.lastName);
      setValue("specialization", doctor.specialization || "");
      setValue("contactPhone", doctor.phoneNumber || "");
      setValue("availableDays", doctor.availableDays || "");
    } else {
      reset();
    }
  }, [doctor, setValue, reset]);

  const onSubmit: SubmitHandler<UpdateDoctorInputs> = async (data) => {
    if (!doctor) {
      toast.error("No doctor selected for update.");
      return;
    }

    try {
      await updateUser({ userId: doctor.userId, ...data }).unwrap();
      toast.success("Doctor updated successfully!");
      reset();
      (document.getElementById("update_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("Failed to update doctor. Please try again.");
    }
  };

  return (
    <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg">Update Doctor</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-white">First Name</span>
            </label>
            <input
              type="text"
              {...register("firstName")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-white">Last Name</span>
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-white">Specialization</span>
            </label>
            <input
              type="text"
              {...register("specialization")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.specialization && (
              <span className="text-red-500">{errors.specialization.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-white">Contact Phone</span>
            </label>
            <input
              type="text"
              {...register("contactPhone")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.contactPhone && (
              <span className="text-red-500">{errors.contactPhone.message}</span>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-white">Available Days</span>
            </label>
            <input
              type="text"
              {...register("availableDays")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.availableDays && (
              <span className="text-red-500">{errors.availableDays.message}</span>
            )}
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateDoctor;
