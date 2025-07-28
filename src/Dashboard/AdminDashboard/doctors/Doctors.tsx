import { useState } from "react";
import { usersAPI, type TUser } from "../../../features/userAPI";
import CreateDoctors from "./CreateDoctors";
import UpdateDoctors from "./UpdateDoctors";
import DeleteDoctor from "./DeleteDoctor";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Doctors = () => {
    const {
        data: doctorsData,
        isLoading: doctorsLoading,
        error: doctorError,
    } = usersAPI.useGetDoctorsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    const [selectedDoctor, setSelectedDoctor] = useState<TUser | null>(null);
    const [doctorToDelete, setDoctorToDelete] = useState<TUser | null>(null);

    const handleEdit = (doctor: TUser) => {
        setSelectedDoctor(doctor);
        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Doctors List</h2>
                <button
                    className="btn bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
                    onClick={() =>
                        (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()
                    }
                >
                    Create Doctor
                </button>
            </div>

            <CreateDoctors />
            <UpdateDoctors doctor={selectedDoctor} />
            <DeleteDoctor doctor={doctorToDelete} />

            {doctorsLoading && <p className="text-gray-600">Loading doctors...</p>}
            {doctorError && <p className="text-red-600">Error loading doctors</p>}

            {Array.isArray(doctorsData?.data) && doctorsData.data.length > 0 ? (
                <div className="overflow-x-auto rounded-md border border-gray-200">
                    <table className="min-w-full table-auto text-left text-sm text-gray-800">
                        <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3">First Name</th>
                                <th className="px-6 py-3">Last Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {doctorsData.data.map((doctor: TUser) => (
                                <tr key={doctor.userId} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">{doctor.firstName}</td>
                                    <td className="px-6 py-4">{doctor.lastName}</td>
                                    <td className="px-6 py-4">{doctor.email}</td>
                                    <td className="px-6 py-4">{doctor.phoneNumber ?? "N/A"}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button
                                            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2"
                                            onClick={() => handleEdit(doctor)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-md p-2"
                                            onClick={() => {
                                                setDoctorToDelete(doctor);
                                                (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
                                            }}
                                        >
                                            <MdDeleteForever />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !doctorsLoading && <p className="text-gray-600 mt-4">No doctors found.</p>
            )}
        </div>
    );
};

export default Doctors;
