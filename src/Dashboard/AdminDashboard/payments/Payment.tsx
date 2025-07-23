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
        <div className="p-6 bg-white rounded-lg shadow-md position-relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Payments List</h2>
                <button
                    className="btn bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
                    onClick={() =>
                        (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()
                    }
                >
                    Create Payment
                </button>
                </div>

                <CreatePayment />
                <UpdatePayment payment={selectedPayment} />
                <DeletePayment payment={paymentToDelete} />

                {paymentsLoading && <p className="text-gray-600">Loading payments...</p>}
                {paymentsError && <p className="text-red-600">Error loading payments</p>}

                {Array.isArray(paymentsData) && paymentsData.length > 0 ? (
                    <div className="overflow-x-auto rounded-md border border-gray-200">
                        <table className="min-w-full table-auto text-left text-sm text-gray-800">
                            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Appointment ID</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Transaction ID</th>
                                    <th className="px-6 py-3">Payment Date</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {paymentsData.map((payment: TPayment) => (
                                    <tr key={payment.paymentId} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">{payment.appointmentId}</td>
                                        <td className="px-6 py-4">{payment.amount}</td>
                                        <td className="px-6 py-4">{payment.transactionId}</td>
                                        <td className="px-6 py-4">{payment.paymentDate}</td>
                                        <td className="px-6 py-4">{payment.status}</td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button
                                                className="text-green-600 hover:text-green-800"
                                                onClick={() => handleEdit(payment)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800"
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
                    !paymentsLoading && <p className="text-gray-600">No payments found</p>
                )}
        </div>
    )
}

export default Payments