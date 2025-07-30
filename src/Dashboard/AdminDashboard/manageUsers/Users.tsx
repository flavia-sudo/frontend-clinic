import { useState } from "react";
import ChangeRole from "./ChangeRole";
import { usersAPI, type TUser } from "../../../features/userAPI";

const Users = () => {
    const { data: usersData, isLoading, error } = usersAPI.useGetUsersQuery(
        undefined, // No parameters needed for this query
        {
            refetchOnMountOrArgChange: true, // Refetch data when component mounts or arguments change
            pollingInterval: 60000, // Poll every 60 seconds to keep data fresh
        }
    );

    // State for the user to update role
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Users List
        </h2>
        </div>
            {/* Change Role Modal */}
            <ChangeRole user={selectedUser} />

            {/* Display Users */}
            {isLoading && <p className="text-gray-600">Loading users...</p>}
            {error && <p className="text-red-600">Error fetching users</p>}
            {Array.isArray(usersData) && usersData.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            <tr>

                                <th className="px-4 py-4 text-left">First Name</th>
                                <th className="px-4 py-4 text-left">Last Name</th>
                                <th className="px-4 py-4 text-left">Email</th>
                                <th className="px-4 py-4 text-left">Role</th>
                                <th className="px-4 py-4 text-left">Verified</th>
                                <th className="px-4 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {usersData.map((user: TUser) => (
                                <tr key={user.userId} className="hover:bg-gray-50 transition">

                                    <td className="px-4 py-3">{user.firstName}</td>
                                    <td className="px-4 py-3">{user.lastName}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.role}</td>
                                    <td className="px-4 py-3">
                                        <span className={`badge ${user.verified ? "badge-success" : "badge-warning"}`}>
                                            {user.verified ? (
                                                <span className="text-green-700 lg:text-base">Verified</span>
                                            ) : (
                                                <span className="text-yellow-700 lg:text-base">Not Verified</span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                (document.getElementById('role_modal') as HTMLDialogElement)?.showModal();
                                            }}
                                        >
                                            Change Role
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default Users;