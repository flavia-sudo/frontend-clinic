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
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Appointments List</h2>
                </div>

                {appointmentsLoading && <p className="text-gray-600">Loading appointments...</p>}
                {appointmentsError && <p className="text-red-600">Error loading appointments</p>}

                {Array.isArray(appointmentsData) && appointmentsData.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-800">
                            <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                <tr>
                                    <th className="px-4 py-4 text-left">User ID</th>
                                    <th className="px-4 py-4 text-left">Doctor ID</th>
                                    <th className="px-4 py-4 text-left">Appointment Date</th>
                                    <th className="px-4 py-4 text-left">Time</th>
                                    <th className="px-4 py-4 text-left">Total Amount</th>
                                    <th className="px-4 py-4 text-left">Status</th>
                                    <th className="px-4 py-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {appointmentsData.map((appointment: TAppointment) => (
                                    <tr key={appointment.appointmentId} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{appointment.userId}</td>
                                        <td className="px-4 py-3">{appointment.doctorId}</td>
                                        <td className="px-4 py-3">{appointment.appointmentDate}</td>
                                        <td className="px-4 py-3">{appointment.time}</td>
                                        <td className="px-4 py-3">{appointment.totalAmount}</td>
                                        <td className="px-4 py-3">{appointment.isCompleted}</td>
                                        <td className="px-4 py-3">
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
                    !appointmentsLoading && <p className="text-gray-600 mt-6 text-center text-base">No appointments found</p>
                )}
        </div>
    );
};

export default Appointments;