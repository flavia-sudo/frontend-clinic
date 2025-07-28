import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { prescriptionAPI } from "../../../features/prescriptionAPI";
import { usersAPI, type TUser } from "../../../features/userAPI"; // import user API

type CreatePrescriptionInputs = {
    appointmentId: number;
    doctorId: number;
    patientId: number;
    prescription: string;
};

const schema = yup.object({
    appointmentId: yup.number().required("Appointment ID is required"),
    doctorId: yup.number().required("Doctor ID is required"),
    patientId: yup.number().required("Patient ID is required"),
    prescription: yup.string().required("Prescription are required"),
});

const CreatePrescription = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatePrescriptionInputs>({
        resolver: yupResolver(schema),
    });

    const { data: doctorsData, isLoading: loadingDoctors } = usersAPI.useGetDoctorsQuery(); // ✅ fetch doctors
    

    const [CreatePrescription, { isLoading }] = prescriptionAPI.useCreatePrescriptionMutation();

    const onSubmit: SubmitHandler<CreatePrescriptionInputs> = async (data) => {
        try {
            await CreatePrescription(data).unwrap();
            toast.success("Prescription created successfully");
            reset();
            (document.getElementById("create_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            toast.error("Failed to create prescription");
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
                <h3 className="font-bold text-xl mb-4 text-gray-800 text-center">Create Prescription</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Appointment ID
                        </label>
                        <input type="number" {...register("appointmentId")} className="input input-bordered w-full max-w-xs" />
                        {errors.appointmentId && <span className="text-red-500">{errors.appointmentId.message}</span>}
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Patient ID
                        </label>
                        <input type="text" {...register("patientId")} className="input input-bordered w-full max-w-xs" />
                        {errors.patientId && <span className="text-red-500">{errors.patientId.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prescription
                        </label>
                        <input type="text" {...register("prescription")} className="input input-bordered w-full max-w-xs" />
                        {errors.prescription && <span className="text-red-500">{errors.prescription.message}</span>}
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create"}
                        </button>
                        <button type="button" className="btn" onClick={() => (document.getElementById("update_modal") as HTMLDialogElement)?.close()}>
                        Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
};

export default CreatePrescription;