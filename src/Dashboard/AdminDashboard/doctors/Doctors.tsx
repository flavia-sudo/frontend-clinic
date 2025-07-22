import { useState } from "react";
import { doctorsAPI, type TDoctor } from "../../../features/doctors/doctorsAPI";
import CreateDoctors from "./CreateDoctors";
import UpdateDoctors from "./UpdateDoctors";
import DeleteDoctor from "./DeleteDoctor";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Doctors = () => {
    const {data: doctorsData, isLoading: doctorsLoading, error: doctorError } = doctorsAPI.useGetDoctorsQuery(
        undefined, {
            refetchOnMountOrArgChange: true,
            pollingInterval: 60000,
        }
    );

    const [selectedDoctor, setSelectedDoctor] = useState<TDoctor | null>(null);

    const [doctorToDelete, setCarToDelete] = useState<TDoctor | null>(null);

    const handleEdit = (doctor: TDoctor) => {
        setSelectedDoctor(doctor);
        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
    };
   console.log(doctorsData);
   return (
    <div className="p-6">
        <div className="flex justify-end mb-4 mt-3">
            <button
                className="btn bg-green-500 hover:bg-green-700 text-black"
                onClick={() => (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()}
                >
                    Create Doctor
                </button>
            </div>
            <CreateDoctors />
            <UpdateDoctors doctor={selectedDoctor} />
            <DeleteDoctor doctor={doctorToDelete} />

            {doctorsLoading && <p>Loading doctors...</p>}
            {doctorError && <p className="text-red-500">Error loading doctors</p>}
            {Array.isArray(doctorsData) && doctorsData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-xl bg-gray-800 text-2xl">
                        <thead>
                            <tr className="bg-gray-800 text-white text-xl lg:text-lg">
                                <th className="px-6 py-4">First Name</th>
                                <th className="px-6 py-4">Last Name</th>
                                <th className="px-6 py-4">Specialization</th>
                                <th className="px-6 py-4">Contact Phone</th>
                                <th className="px-6 py-4">Available Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctorsData.map((doctor: TDoctor) => (
                                <tr key={doctor.doctorId}>
                                    <td className="px-6 py-4">{doctor.firstName}</td>
                                    <td className="px-6 py-4">{doctor.lastName}</td>
                                    <td className="px-6 py-4">{doctor.specialization}</td>
                                    <td className="px-6 py-4">{doctor.contactPhone}</td>
                                    <td className="px-6 py-4">{doctor.availableDays}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="btn btn-primary mr-2"
                                            onClick={() => handleEdit(doctor)}
                                        >
                                            <FaEdit size={20} />
                                        </button>
                                        <button
                                            className="btn btn-error"
                                            onClick={() => { setCarToDelete(doctor);
                                                (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
                                            }}
                                        >
                                            <MdDeleteForever size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No doctors found.</p>
            )}
        </div>
   )
}

export default Doctors