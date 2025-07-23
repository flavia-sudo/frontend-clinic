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
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Complaints</h2>
                <button className="btn btn-primary" onClick={() => (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()}>
                    Create Complaint
                </button>
            </div>

            <CreateComplaint />
            <UpdateComplaint complaint={selectedComplaint} />
            <DeleteComplaint complaint={complaintToDelete} />

            {complaintsLoading && <p className="text-gray-600">Loading complaints...</p>}
            {complaintsError && <p className="text-red-600">Error loading complaints</p>}

            {Array.isArray(complaintsData) && complaintsData.length > 0 ? (
              <div className="overflow-x-auto rounded-md border border-gray-200">
                        <table className="min-w-full table-auto text-left text-sm text-gray-800">
                            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">User ID</th>
                                    <th className="px-6 py-3">Appointment ID</th>
                                    <th className="px-6 py-3">Subject</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {complaintsData.map((complaint: TComplaint) => (
                                    <tr key={complaint.complaintId} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">{complaint.userId}</td>
                                        <td className="px-6 py-4">{complaint.appointmentId}</td>
                                        <td className="px-6 py-4">{complaint.subject}</td>
                                        <td className="px-6 py-4">{complaint.description}</td>
                                        <td className="px-6 py-4">{complaint.status}</td>
                                        <td className="px-6 py-4">
                                            <button className="btn btn-sm bg-blue-600 hover:bg-blue-800 text-white rounded-md p-2" onClick={() => handleEdit(complaint)}>
                                                <FaEdit />
                                            </button>
                                            <button 
                                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-md p-2"
                                            onClick={() => { setComplaintToDelete(complaint);
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
                !complaintsLoading && !complaintsError && <p className="text-gray-600">No complaints found</p>
            )}
        </div>
    );
};

export default Complaints;