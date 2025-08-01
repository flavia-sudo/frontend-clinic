import { useState } from "react";
import CreateComplaint from "./CreateComplaint";
import UpdateComplaint from "./UpdateComplaint";
import DeleteComplaint from "./DeleteComplaint";
import { complaintsAPI, type TComplaint } from "../../../features/complaintAPI";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Complaints = () => {
    const {
        data: complaintsData,
        isLoading: complaintsLoading,
        error: complaintsError,
    } = complaintsAPI.useGetComplaintsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000
    });

    const [selectedComplaint, setSelectedComplaint] = useState<TComplaint | null>(null);
    const [complaintToDelete, setComplaintToDelete] = useState<TComplaint | null>(null);

    const handleEdit = (complaint: TComplaint) => {
        setSelectedComplaint(complaint);
        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Complaints</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-sm" onClick={() => (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()}>
                    + Create Complaint
                </button>
            </div>

            <CreateComplaint />
            <UpdateComplaint complaint={selectedComplaint} />
            <DeleteComplaint complaint={complaintToDelete} />

            {complaintsLoading && <p className="text-gray-600">Loading complaints...</p>}
            {complaintsError && <p className="text-red-600">Error loading complaints</p>}

            {Array.isArray(complaintsData) && complaintsData.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-800">
                            <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                <tr>
                                    <th className="px-4 py-4 text-left">User ID</th>
                                    <th className="px-4 py-4 text-left">Appointment ID</th>
                                    <th className="px-4 py-4 text-left">Subject</th>
                                    <th className="px-4 py-4 text-left">Description</th>
                                    <th className="px-4 py-4 text-left">Status</th>
                                    <th className="px-4 py-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {complaintsData.map((complaint: TComplaint) => (
                                    <tr key={complaint.complaintId} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{complaint.userId}</td>
                                        <td className="px-4 py-3">{complaint.appointmentId}</td>
                                        <td className="px-4 py-3">{complaint.subject}</td>
                                        <td className="px-4 py-3">{complaint.description}</td>
                                        <td className="px-4 py-3">{complaint.status ? "Resolved" : "Pending"}</td>
                                        <td className="px-4 py-3">
                                            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300" 
                                            onClick={() => handleEdit(complaint)}>
                                                <FaEdit />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>  
            ) : (
                !complaintsLoading && !complaintsError && <p className="text-gray-600 mt-6 text-center text-base">No complaints found</p>
            )}
        </div>
    );
};

export default Complaints;