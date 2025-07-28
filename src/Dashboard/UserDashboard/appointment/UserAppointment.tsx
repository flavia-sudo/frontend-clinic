import { appointmentsAPI, type TAppointment } from "../../../features/appointmentAPI";

const Appointments = () => {
    const userString = localStorage.getItem("User");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user?.userId;

    const {
        data: appointmentsData,
        isLoading: appointmentsLoading,
        error: appointmentsError,
    } = appointmentsAPI.useGetUserAppointmentsQuery(userId, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });


    return (
        <div className="p-6 bg-white rounded-lg shadow-md position-relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Appointments List</h2>
                </div>

                {appointmentsLoading && <p className="text-gray-600">Loading appointments...</p>}
                {appointmentsError && <p className="text-red-600">Error loading appointments</p>}

                {Array.isArray(appointmentsData) && appointmentsData.length > 0 ? (
                    <div className="overflow-x-auto rounded-md border border-gray-200">
                        <table className="min-w-full table-auto text-left text-sm text-gray-800">
                            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">User ID</th>
                                    <th className="px-6 py-3">Doctor ID</th>
                                    <th className="px-6 py-3">Appointment Date</th>
                                    <th className="px-6 py-3">Time</th>
                                    <th className="px-6 py-3">Total Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {appointmentsData.map((appointment: TAppointment) => (
                                    <tr key={appointment.appointmentId} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">{appointment.userId}</td>
                                        <td className="px-6 py-4">{appointment.doctorId}</td>
                                        <td className="px-6 py-4">{appointment.appointmentDate}</td>
                                        <td className="px-6 py-4">{appointment.time}</td>
                                        <td className="px-6 py-4">{appointment.totalAmount}</td>
                                        <td className="px-6 py-4">{appointment.isCompleted}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="btn bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
                                            >View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !appointmentsLoading && <p className="text-gray-600">No appointments found</p>
                )}
        </div>
    );
};

export default Appointments;