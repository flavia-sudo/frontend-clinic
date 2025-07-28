import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../../features/userAPI";
import { toast } from "sonner";

type CreateDoctorInputs = {
  firstName: string;
  lastName: string;
  specialization: string;
  phoneNumber: string;
  availableDays: string;
};

const schema = yup.object({
  firstName: yup.string().max(50, "Max 50 characters").required("First name is required"),
  lastName: yup.string().max(50, "Max 50 characters").required("Last name is required"),
  specialization: yup.string().max(50, "Max 50 characters").required("Specialization is required"),
  phoneNumber: yup.string().max(50, "Max 50 characters").required("Phone number is required"),
  availableDays: yup.string().max(50, "Max 50 characters").required("Available days are required"),
  
});

const CreateDoctors = () => {
  const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDoctorInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateDoctorInputs> = async (data) => {
    try {
      await createUser({ ...data, role: "doctor" }).unwrap();
      toast.success("Doctor created successfully!");
      reset();
      (document.getElementById("create_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      toast.error("Failed to create doctor.");
    }
  };

  return (
    <dialog id="create_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg">Create Doctor</h3>
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
            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
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
            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
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
              <span className="label-text text-white">Phone Number</span>
            </label>
            <input
              type="text"
              {...register("phoneNumber")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber.message}</span>
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
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateDoctors;
