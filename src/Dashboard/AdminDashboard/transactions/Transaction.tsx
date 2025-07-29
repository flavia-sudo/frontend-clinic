import { useState } from "react";
import { transactionsAPI, type TTransaction } from "../../../features/transactionAPI";
import CreateTransaction from "./CreateTransaction";
import UpdateTransaction from "./UpdateTransaction";
import DeleteTransaction from "./DeleteTransaction";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Transactions = () => {
    const {
        data: transactionsData,
        isLoading: transactionsLoading,
        error: transactionsError,
    } = transactionsAPI.useGetTransactionsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000
    });

    const [selectedTransaction, setSelectedTransaction] = useState<TTransaction | null>(null);
    const [transactionToDelete, setTransactionToDelete] = useState<TTransaction | null>(null);

    const handleEdit = (transaction: TTransaction) => {
        setSelectedTransaction(transaction);
        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Transactions List</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-sm" onClick={() => (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()}>
                   + Create Transaction
                </button>
            </div>

            <CreateTransaction />
            <UpdateTransaction transaction={selectedTransaction} />
            <DeleteTransaction transaction={transactionToDelete} />

            {transactionsLoading && <p className="text-gray-600">Loading transactions...</p>}
            {transactionsError && <p className="text-red-600">Error loading transactions</p>}

            {Array.isArray(transactionsData) && transactionsData.length > 0 ? (
                <div className="overflow-x-auto rounded-md border border-gray-200">
                        <table className="min-w-full text-sm text-gray-800">
                            <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                <tr>
                                    <th className="px-4 py-4 text-left">User ID</th>
                                    <th className="px-4 py-4 text-left">Transaction Name</th>
                                    <th className="px-4 py-4 text-left">Amount</th>
                                    <th className="px-4 py-4 text-left">Status</th>
                                    <th className="px-4 py-4 text-left">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {transactionsData.map((transaction: TTransaction) => (
                                    <tr key={transaction.transactionId} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">{transaction.userId}</td>
                                    <td className="px-4 py-3">{transaction.transactionName}</td>
                                    <td className="px-4 py-3">{transaction.amount}</td>
                                    <td className="px-4 py-3">{transaction.status}</td>
                                    <td className="px-4 py-3">
                                        <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={() => handleEdit(transaction)}>
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
                                            onClick={() => { setTransactionToDelete(transaction);
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
                !transactionsLoading && !transactionsError && <p className="text-gray-600 mt-6 text-center text-base">No transactions found</p>
             )}
        </div>
    );
};
                    
export default Transactions;
