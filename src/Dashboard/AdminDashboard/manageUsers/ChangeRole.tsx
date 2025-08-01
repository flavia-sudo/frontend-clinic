import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI, type TUser } from "../../../features/userAPI";
import { toast } from "sonner";
import { useEffect } from "react";

type ChangeRoleProps = {
    user: TUser | null;
};

type ChangeRoleInputs = {
    role: "user" | "admin" | "doctor";
};

const schema = yup.object({
    role: yup.string().oneOf(["user", "admin", "doctor"]).required("Role is required"),
});

const ChangeRole = ({ user }: ChangeRoleProps) => {
    const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation(
        { fixedCacheKey: "updateUser" }
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ChangeRoleInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            role: user ? (user.role as "user" | "admin" | "doctor") : "user", // Default to user's current role or "user"
        },
    });

    // Update form value when user changes
    // (so the modal always shows the correct role)
    useEffect(() => {
        if (user) {
            setValue("role", user.role as "user" | "admin" | "doctor"); // Set the role based on the user object
        } else {
            reset();
        }
    }, [user, setValue, reset]);

    const onSubmit: SubmitHandler<ChangeRoleInputs> = async (data) => {
        try {
            if (!user) {
                toast.error("No user selected for role change.");
                return;
            }
            await updateUser({ userId: user.userId, role: data.role })
            toast.success("Role updated successfully!");
            reset();
            (document.getElementById('role_modal') as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update role. Please try again.");
        }
    };

    return (
        <dialog id="role_modal" className="fixed inset-0 z-50 bg-transparent">
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
            (document.getElementById("role_modal") as HTMLDialogElement)?.close();
            reset();
            }}
        ></div>

        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-50">
            <h3 className="font-bold text-xl mb-4 text-gray-800">
            Change Role for {user?.firstName} {user?.lastName}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Role:</label>
                <select
                {...register("role")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white"
                >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                </select>
                {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                onClick={() => {
                    (document.getElementById("role_modal") as HTMLDialogElement)?.close();
                    reset();
                }}
                >
                Cancel
                </button>

                <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                disabled={isLoading}
                >
                {isLoading ? (
                    <>
                    <span className="loading loading-spinner text-white" /> Updating...
                    </>
                ) : (
                    "Update Role"
                )}
                </button>
            </div>
            </form>
        </div>
        </dialog>

    );
};

export default ChangeRole;