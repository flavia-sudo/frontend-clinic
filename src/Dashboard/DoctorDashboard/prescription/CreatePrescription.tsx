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
    

    const [createPrescription, { isLoading }] = prescriptionAPI.useCreatePrescriptionMutation();

    const onSubmit: SubmitHandler<CreatePrescriptionInputs> = async (data) => {
    const payload = {
        ...data,
        appointmentId: Number(data.appointmentId),
        doctorId: Number(data.doctorId),
        patientId: Number(data.patientId),
    };

    try {
        await createPrescription(payload).unwrap();
        toast.success("Prescription created successfully");
        reset();
        (document.getElementById("create_modal") as HTMLDialogElement)?.close();
    } catch (error) {
        toast.error("Failed to create prescription");
        console.error("Error:", error);
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
            <div className="form-control w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment ID
                </label>
                <input
                    type="number"
                    {...register("appointmentId")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.appointmentId && <span className="text-red-500 text-xs mt-1">{errors.appointmentId.message}</span>}
            </div>

            {/* Doctor Dropdown */}
            <div className="form-control w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                <select
                    {...register("doctorId")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loadingDoctors}
                >
                    <option value="">-- Choose a Doctor --</option>
                    {doctorsData?.map((doctor: TUser) => (
                        <option key={doctor.userId} value={doctor.userId}>
                            Dr. {doctor.firstName} {doctor.lastName} ({doctor.specialization})
                        </option>
                    ))}
                </select>
                {errors.doctorId && <p className="text-red-500 text-xs mt-1">{errors.doctorId.message}</p>}
            </div>

            <div className="form-control w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient ID
                </label>
                <input
                    type="number"
                    {...register("patientId")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.patientId && <span className="text-red-500 text-xs mt-1">{errors.patientId.message}</span>}
            </div>

            <div className="form-control w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prescription
                </label>
                <input
                    type="text"
                    {...register("prescription")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.prescription && <span className="text-red-500 text-xs mt-1">{errors.prescription.message}</span>}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                    onClick={() => (document.getElementById("create_modal") as HTMLDialogElement)?.close()}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                    {isLoading ? "Creating..." : "Create"}
                </button>
            </div>
        </form>
    </div>
</dialog>
    )
};

export default CreatePrescription;