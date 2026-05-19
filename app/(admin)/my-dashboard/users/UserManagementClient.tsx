"use client";

import  { useState, useTransition } from "react";
import { Trash2, UserX, Loader2 } from "lucide-react";
import { deleteUserAction, updateUserRoleAction } from "@/actions/auth.actions";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  createdAt: string;
}

interface ClientProps {
  initialUsers: UserType[];
}

export default function UserManagementClient({ initialUsers }: ClientProps) {
  const [isPending, startTransition] = useTransition();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  // Delete Event Hook Trigger Function Handler Execution
  const handleDelete = async (userId: string) => {
    if (!confirm("Are you absolutely sure you want to delete this user?"))
      return;

    setLoadingUserId(userId);
    startTransition(async () => {
      const res = await deleteUserAction(userId);
      if (!res.success) alert(res.message);
      setLoadingUserId(null);
    });
  };

  // Role Updating Event Switch Trigger Engine Action Execution
  const handleRoleChange = async (
    userId: string,
    newRole: "admin" | "moderator" | "user"
  ) => {
    setLoadingUserId(userId);
    startTransition(async () => {
      const res = await updateUserRoleAction(userId, newRole);
      if (!res.success) alert(res.message);
      setLoadingUserId(null);
    });
  };

  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-50 text-red-700 border-red-200";
      case "moderator":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="relative">
      {/* Global Interaction Layer Disable Backdrop Loading Spinner Controller Hook */}
      {isPending && !loadingUserId && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-50 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-700" />
        </div>
      )}

      {/* --- DESKTOP TABLE VIEW DISPLAY FRAMEPORT (Visible inside lg screens up) --- */}
      <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
              <th className="py-4 px-6">User details</th>
              <th className="py-4 px-6">Assigned Role</th>
              <th className="py-4 px-6">Joined Date</th>
              <th className="py-4 px-6 text-right">Actions Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
            {initialUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50/40 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="font-bold text-gray-900 capitalize">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-400 font-normal mt-0.5">
                    {user.email}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${getRoleBadgeStyles(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500 text-xs">
                  {user.createdAt}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {/* Dropdown element action to update targeted role parameters structure */}
                    <select
                      value={user.role}
                      disabled={loadingUserId === user.id}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value as any)
                      }
                      className="text-xs font-bold bg-gray-50 text-gray-800 border border-gray-200 rounded-lg p-1.5 focus:outline-none cursor-pointer focus:border-gray-400 disabled:opacity-50"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>

                    {/* Row Target Entity Specific Database Record Removals Destruction Button Element */}
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={loadingUserId === user.id}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                      title="Delete Account Entry"
                    >
                      {loadingUserId === user.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE DISPLAY STACK GRID RESPONSIVE OVERRIDES LAYOUT (Visible up to md dimensions) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {initialUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4"
          >
            {/* Profile Meta Segment */}
            <div className="flex items-start justify-between">
              <div className="max-w-[70%]">
                <h3 className="font-black text-gray-900 capitalize text-base truncate">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                  {user.email}
                </p>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wide block mt-2">
                  JOINED: {user.createdAt}
                </span>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${getRoleBadgeStyles(
                  user.role
                )}`}
              >
                {user.role}
              </span>
            </div>

            {/* Interactive Mobile Operations Quick Access Buttons Tray */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50 gap-2">
              <div className="flex items-center gap-2 flex-grow max-w-[70%]">
                <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
                  Role:
                </span>
                <select
                  value={user.role}
                  disabled={loadingUserId === user.id}
                  onChange={(e) =>
                    handleRoleChange(user.id, e.target.value as any)
                  }
                  className="w-full text-xs font-bold bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none cursor-pointer disabled:opacity-50"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                onClick={() => handleDelete(user.id)}
                disabled={loadingUserId === user.id}
                className="flex items-center justify-center p-2.5 bg-red-50 text-red-600 active:scale-95 hover:bg-red-100 rounded-xl transition-all disabled:opacity-40"
              >
                {loadingUserId === user.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Collection Placeholder Panel Box Interface Display fallback */}
      {initialUsers.length === 0 && (
        <div className="w-full text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <UserX className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <h3 className="text-lg font-black text-gray-900">
            No matching system accounts found
          </h3>
          <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto mt-1">
            There are currently no users logged or matched within our core
            authentication tables inside the database.
          </p>
        </div>
      )}
    </div>
  );
}
