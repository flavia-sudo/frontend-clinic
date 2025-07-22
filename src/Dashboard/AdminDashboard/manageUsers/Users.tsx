import { useState } from "react";
import ChangeRole from "./ChangeRole";
import { usersAPI, type TUser } from "../../../features/users/userAPI";

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
        <div>

            {/* Change Role Modal */}
            <ChangeRole user={selectedUser} />

            {/* Display Users */}
            {isLoading && <p>Loading users...</p>}
            {error && <p className="text-red-500">Error fetching users</p>}
            {Array.isArray(usersData) && usersData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-xl bg-gray-800 text-2xl">
                        <thead>
                            <tr className="bg-gray-800 text-white text-xl lg:text-lg">

                                <th className="px-6 py-4">First Name</th>
                                <th className="px-6 py-4">Last Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Verified</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user: TUser) => (
                                <tr key={user.userId} className="hover:bg-gray-600 border-b border-gray-400">

                                    <td className="px-6 py-4 border-r border-gray-400 lg:text-base">{user.firstName}</td>
                                    <td className="px-6 py-4 border-r border-gray-400 lg:text-base">{user.lastName}</td>
                                    <td className="px-6 py-4 border-r border-gray-400 lg:text-base">{user.email}</td>
                                    <td className="px-6 py-4 border-r border-gray-400 lg:text-base">{user.role}</td>
                                    <td className="px-6 py-4 border-r border-gray-400 lg:text-base">
                                        <span className={`badge ${user.verified ? "badge-success" : "badge-warning"}`}>
                                            {user.verified ? (
                                                <span className="text-green-700 lg:text-base">Verified</span>
                                            ) : (
                                                <span className="text-yellow-700 lg:text-base">Not Verified</span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="btn btn-sm btn-primary text-white"
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