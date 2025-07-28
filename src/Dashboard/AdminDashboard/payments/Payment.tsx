import { useState } from "react";
import { paymentAPI, type TPayment } from "../../../features/paymentAPI";
import CreatePayment from "./CreatePayment";
import UpdatePayment from "./UpdatePayment";
import DeletePayment from "./DeletePayment";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Payments = () => {
    const {
        data: paymentsData,
        isLoading: paymentsLoading,
        error: paymentsError,
    } = paymentAPI.useGetPaymentsQuery(undefined, { refetchOnMountOrArgChange: true, pollingInterval: 60000 });

    const [selectedPayment, setSelectedPayment] = useState<TPayment | null>(null);
    const [paymentToDelete, setPaymentToDelete] = useState<TPayment | null>(null);

    const handleEdit = (payment: TPayment) => {
        setSelectedPayment(payment);
        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Payments List</h2>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-sm"
                    onClick={() =>
                        (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()
                    }
                >
                   + Create Payment
                </button>
                </div>

                <CreatePayment />
                <UpdatePayment payment={selectedPayment} />
                <DeletePayment payment={paymentToDelete} />

                {paymentsLoading && <p className="text-gray-600">Loading payments...</p>}
                {paymentsError && <p className="text-red-600">Error loading payments</p>}

                {Array.isArray(paymentsData) && paymentsData.length > 0 ? (
                    <div className="overflow-x-auto rounded-md border border-gray-200">
                        <table className="min-w-full text-sm text-gray-800">
                            <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                <tr>
                                    <th className="px-4 py-4 text-left">Appointment ID</th>
                                    <th className="px-4 py-4 text-left">Amount</th>
                                    <th className="px-4 py-4 text-left">Transaction ID</th>
                                    <th className="px-4 py-4 text-left">Payment Date</th>
                                    <th className="px-4 py-4 text-left">Status</th>
                                    <th className="px-4 py-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {paymentsData.map((payment: TPayment) => (
                                    <tr key={payment.paymentId} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{payment.appointmentId}</td>
                                        <td className="px-4 py-3">{payment.amount}</td>
                                        <td className="px-4 py-3">{payment.transactionId}</td>
                                        <td className="px-4 py-3">{payment.paymentDate}</td>
                                        <td className="px-4 py-3">{payment.status}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                onClick={() => handleEdit(payment)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
                                                onClick={() => setPaymentToDelete(payment)}
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
                    !paymentsLoading && <p className="text-gray-600 mt-6 text-center text-base">No payments found</p>
                )}
        </div>
    )
}

export default Payments