import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { prescriptionAPI } from "../../../features/prescriptionAPI";

type CreatePrescriptionInputs = {
    appointmentId: number;
    doctorId: number;
    patientId: number;
    notes: string;
};

const schema = yup.object({
    appointmentId: yup.number().required("Appointment ID is required"),
    doctorId: yup.number().required("Doctor ID is required"),
    patientId: yup.number().required("Patient ID is required"),
    notes: yup.string().required("Notes are required"),
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

    return (
        <dialog id="create_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg">Create Complaint</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Appointment ID</span>
                        </label>
                        <input type="text" {...register("appointmentId")} className="input input-bordered w-full max-w-xs" />
                        {errors.appointmentId && <span className="text-red-500">{errors.appointmentId.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Doctor ID</span>
                        </label>
                        <input type="text" {...register("doctorId")} className="input input-bordered w-full max-w-xs" />
                        {errors.doctorId && <span className="text-red-500">{errors.doctorId.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Patient ID</span>
                        </label>
                        <input type="text" {...register("patientId")} className="input input-bordered w-full max-w-xs" />
                        {errors.patientId && <span className="text-red-500">{errors.patientId.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Notes</span>
                        </label>
                        <input type="text" {...register("notes")} className="input input-bordered w-full max-w-xs" />
                        {errors.notes && <span className="text-red-500">{errors.notes.message}</span>}
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