import { prescriptionAPI, type TPrescription } from "../../../features/prescriptionAPI";

const Prescriptions = () => {
    const userString = localStorage.getItem("User");
    const user = userString ? JSON.parse(userString) : null;
    const doctorId = user?.userId;

    const {
        data: prescriptionsData,
        isLoading: prescriptionsLoading,
        error: prescriptionsError,
    } = prescriptionAPI.useGetDoctorPrescriptionQuery(doctorId, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000
    });

    return (
            <div className="p-6 bg-white rounded-lg shadow-md position-relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Prescriptions List</h2>
                    <button className="btn bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition duration-200" onClick={() => (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()}>
                        Create Prescription
                    </button>
                </div>
        
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {prescriptionsData.map((prescription: TPrescription) => (
                                        <tr key={prescription.prescriptionId} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">{prescription.appointmentId}</td>
                                            <td className="px-6 py-4">{prescription.doctorId}</td>
                                            <td className="px-6 py-4">{prescription.patientId}</td>
                                            <td className="px-6 py-4">{prescription.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>  
                ) : (
                    !prescriptionsLoading && !prescriptionsError && <p className="text-gray-600">No prescriptions found</p>
                )}
            </div>
        );
    };
    
export default Prescriptions;