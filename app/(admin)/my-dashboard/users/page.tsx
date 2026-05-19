import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";
import UserManagementClient from "./UserManagementClient";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await connectDB();

  const dbUsers = await User.find({}).sort({ createdAt: -1 }).lean();

  const users = dbUsers.map((user: any) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "N/A",
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              User Management Portal
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Manage user security roles, check metadata statuses, and perform
              absolute account deletions.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-[#7c0a43] text-white font-bold text-sm px-5 py-3 rounded-xl shadow-sm hover:bg-[#630835] active:scale-95 transition-all w-full sm:w-auto"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </Link>
          </div>
        </div>

        <UserManagementClient initialUsers={users} />
      </div>
    </main>
  );
}
