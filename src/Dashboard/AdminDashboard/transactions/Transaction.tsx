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
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Transactions</h2>
                <button className="btn btn-primary" onClick={() => (document.getElementById("create_modal") as HTMLDialogElement)?.showModal()}>
                    Create Transaction
                </button>
            </div>

            <CreateTransaction />
            <UpdateTransaction transaction={selectedTransaction} />
            <DeleteTransaction transaction={transactionToDelete} />

            {transactionsLoading && <p className="text-gray-600">Loading transactions...</p>}
            {transactionsError && <p className="text-red-600">Error loading transactions</p>}

            {Array.isArray(transactionsData) && transactionsData.length > 0 ? (
                <div className="overflow-x-auto rounded-md border border-gray-200">
                                            <table className="min-w-full table-auto text-left text-sm text-gray-800">
                                                <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                                                    <tr>
                                                        <th className="px-6 py-3">User ID</th>
                                                        <th className="px-6 py-3">Transaction Name</th>
                                                        <th className="px-6 py-3">Amount</th>
                                                        <th className="px-6 py-3">Status</th>
                                                        <th className="px-6 py-3">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {transactionsData.map((transaction: TTransaction) => (
                                                        <tr key={transaction.transactionId} className="hover:bg-gray-50 transition">
                                                            <td className="px-6 py-4">{transaction.userId}</td>
                                                            <td className="px-6 py-4">{transaction.transactionName}</td>
                                                            <td className="px-6 py-4">{transaction.amount}</td>
                                                            <td className="px-6 py-4">{transaction.status}</td>
                                                            <td className="px-6 py-4">
                                                                <button className="btn btn-sm bg-blue-600 hover:bg-blue-800 text-white rounded-md p-2" onClick={() => handleEdit(transaction)}>
                                                                    <FaEdit />
                                                                </button>
                                                                <button 
                                                                className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-md p-2"
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
                                    !transactionsLoading && !transactionsError && <p className="text-gray-600">No transactions found</p>
                                )}
                            </div>
                        );
                    };
                    
                export default Transactions;
