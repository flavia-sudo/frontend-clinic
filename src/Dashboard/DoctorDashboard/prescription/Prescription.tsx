import { useState } from "react";
import { prescriptionAPI, type TPrescription } from "../../../features/prescriptionAPI";
import CreatePrescription from "./CreatePrescription";
import UpdatePrescription from "./UpdatePrescription";
import DeletePrescription from "../../AdminDashboard/prescriptions/DeletePrescription";
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
            <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Prescriptions List</h2>
                        <button 
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-sm" 
                        onClick={() => {
                            const modal = document.getElementById("create_modal") as HTMLDialogElement;
                            if (modal) modal.showModal();
                            else console.error("Create modal not found in DOM");
                        }}
                        >
                        + Create Prescription
                        </button>
                </div>
    
                <CreatePrescription />
                <UpdatePrescription prescription={selectedPrescription} />
                <DeletePrescription prescription={prescriptionToDelete} />
    
                {prescriptionsLoading && <p className="text-gray-600">Loading prescriptions...</p>}
                {prescriptionsError && <p className="text-red-600">Error loading prescriptions</p>}
    
                {Array.isArray(prescriptionsData) && prescriptionsData.length > 0 ? (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full text-sm text-gray-800">
                                <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    <tr>
                                        <th className="px-4 py-4 text-left">Appointment ID</th>
                                        <th className="px-4 py-4 text-left">Doctor ID</th>
                                        <th className="px-4 py-4 text-left">Patient ID</th>
                                        <th className="px-4 py-4 text-left">Notes</th>
                                        <th className="px-4 py-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {prescriptionsData.map((prescription: TPrescription) => (
                                        <tr key={prescription.prescriptionId} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3">{prescription.appointmentId}</td>
                                            <td className="px-4 py-3">{prescription.doctorId}</td>
                                            <td className="px-4 py-3">{prescription.patientId}</td>
                                            <td className="px-4 py-3">{prescription.prescription}</td>
                                            <td className="px-4 py-3">
                                                <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={() => handleEdit(prescription)}>
                                                    <FaEdit />
                                                </button>
                                                <button 
                                                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
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
                    !prescriptionsLoading && !prescriptionsError && <p className="text-gray-600 mt-6 text-center text-base">No prescriptions found</p>
                )}
            </div>
        );
    };
    
export default Prescriptions;