import { useState } from "react";
import { prescriptionAPI, type TPrescription } from "../../../features/prescriptionAPI";
import CreatePrescription from "./CreatePrescription";
import UpdatePrescription from "./UpdatePrescription";
import DeletePrescription from "./DeletePrescription";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Prescriptions = () => {
    const {
        data: prescriptionsData,
        isLoading: prescriptionsLoading,
        error: prescriptionsError,
    } = prescriptionAPI.useGetPrescriptionsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000
    });

    const [selectedPrescription, setSelectedPrescription] = useState<TPrescription | null>(null);
    const [prescriptionToDelete, setPrescriptionToDelete] = useState<TPrescription | null>(null);

    const handleEdit = (prescription: TPrescription) => {
        setSelectedPrescription(prescription);
        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
    };

    return (
            <div className="p-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">Prescriptions</h2>
                    <button className="btn btn-primary" onClick={() => (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()}>
                        Create Prescription
                    </button>
                </div>
    
                <CreatePrescription />
                <UpdatePrescription prescription={selectedPrescription} />
                <DeletePrescription prescription={prescriptionToDelete} />
    
                {prescriptionsLoading && <p className="text-gray-600">Loading prescriptions...</p>}
                {prescriptionsError && <p className="text-red-600">Error loading prescriptions</p>}
    
                {Array.isArray(prescriptionsData) && prescriptionsData.length > 0 ? (
                  <div className="overflow-x-auto rounded-md border border-gray-200">
                            <table className="min-w-full table-auto text-left text-sm text-gray-800">
                                <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3">Appointment ID</th>
                                        <th className="px-6 py-3">Doctor ID</th>
                                        <th className="px-6 py-3">Patient ID</th>
                                        <th className="px-6 py-3">Notes</th>
                                        <th className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {prescriptionsData.map((prescription: TPrescription) => (
                                        <tr key={prescription.prescriptionId} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">{prescription.appointmentId}</td>
                                            <td className="px-6 py-4">{prescription.doctorId}</td>
                                            <td className="px-6 py-4">{prescription.patientId}</td>
                                            <td className="px-6 py-4">{prescription.notes}</td>
                                            <td className="px-6 py-4">
                                                <button className="btn btn-sm bg-blue-600 hover:bg-blue-800 text-white rounded-md p-2" onClick={() => handleEdit(prescription)}>
                                                    <FaEdit />
                                                </button>
                                                <button 
                                                className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-md p-2"
                                                onClick={() => { setPrescriptionToDelete(prescription);
                                                    (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
                                                }}>
                                                    <MdDeleteForever />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>  
                ) : (
                    !prescriptionsLoading && !prescriptionsError && <p className="text-gray-600">No complaints found</p>
                )}
            </div>
        );
    };
    
export default Prescriptions;