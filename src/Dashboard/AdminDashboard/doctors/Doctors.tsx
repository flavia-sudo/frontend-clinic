import React, { useState } from 'react'
import { usersAPI, type TUser } from '../../../features/userAPI'
import CreateDoctors from './CreateDoctors'
import UpdateDoctors from './UpdateDoctors'
import DeleteDoctor from './DeleteDoctor'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
const Doctors = () => {
  const {
    data: doctorsData,
    isLoading: doctorsLoading,
    error: doctorError,
  } = usersAPI.useGetDoctorsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  })
  console.log(doctorsData)
  const [selectedDoctor, setSelectedDoctor] = useState<TUser | null>(null)
  const [doctorToDelete, setDoctorToDelete] = useState<TUser | null>(null)
  const handleEdit = (doctor: TUser) => {
    setSelectedDoctor(doctor)
    ;(document.getElementById('update_modal') as HTMLDialogElement)?.showModal()
  }
  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Doctors List
        </h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-sm"
          onClick={() =>
            (
              document.getElementById('create_modal') as HTMLDialogElement
            )?.showModal()
          }
        >
          + Create Doctor
        </button>
      </div>
      <CreateDoctors />
      <UpdateDoctors doctor={selectedDoctor} />
      <DeleteDoctor doctor={doctorToDelete} />
      {doctorsLoading && <p className="text-gray-600">Loading doctors...</p>}
      {doctorError && <p className="text-red-600">Error loading doctors</p>}
      {Array.isArray(doctorsData) && doctorsData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-4 text-left">First Name</th>
                <th className="px-4 py-4 text-left">Last Name</th>
                <th className="px-4 py-4 text-left">Email</th>
                <th className="px-4 py-4 text-left">Phone</th>
                <th className="px-4 py-4 text-left">Specialization</th>
                <th className="px-4 py-4 text-left">Available Days</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {doctorsData.map((doctor: TUser) => (
                <tr key={doctor.userId} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{doctor.firstName}</td>
                  <td className="px-4 py-3">{doctor.lastName}</td>
                  <td className="px-4 py-3">{doctor.email}</td>
                  <td className="px-4 py-3">{doctor.phoneNumber ?? 'N/A'}</td>
                  <td className="px-4 py-3">
                    {doctor.specialization ?? 'N/A'}
                  </td>
                  <td className="px-4 py-3">{doctor.availableDays ?? 'N/A'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onClick={() => handleEdit(doctor)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => {
                        setDoctorToDelete(doctor)
                        ;(
                          document.getElementById(
                            'delete_modal',
                          ) as HTMLDialogElement
                        )?.showModal()
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
        !doctorsLoading && (
          <p className="text-gray-600 mt-6 text-center text-base">
            No doctors found.
          </p>
        )
      )}
    </div>
  )
}
export default Doctors
