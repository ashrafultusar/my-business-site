import { getCurrentUser } from "@/lib/data/getUser";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-pink-950">
                    Welcome back, {user?.name?.split(" ")[0]} 👋
                </h1>
                <p className="text-pink-900/70 mt-1">
                    Here&apos;s what&apos;s happening in your dashboard.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md hover:shadow-pink-500/10 transition-all">
                    <p className="text-pink-900/70 text-sm font-medium">Account Type</p>
                    <p className="text-pink-950 text-2xl font-bold mt-1 capitalize">{user?.role}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md hover:shadow-pink-500/10 transition-all">
                    <p className="text-pink-900/70 text-sm font-medium">Email</p>
                    <p className="text-pink-950 text-lg font-semibold mt-1 truncate">{user?.email}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md hover:shadow-pink-500/10 transition-all">
                    <p className="text-pink-900/70 text-sm font-medium">Member Since</p>
                    <p className="text-pink-950 text-xl font-bold mt-1">
                        {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                            })
                            : "—"}
                    </p>
                </div>
            </div>

            {/* Account Info */}
            <div className="bg-white shadow-xl shadow-pink-900/5 border border-pink-100 rounded-2xl p-6">
                <h2 className="text-pink-950 font-semibold text-lg mb-4">Account Details</h2>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-pink-50">
                        <span className="text-pink-900/70 text-sm font-medium">Full Name</span>
                        <span className="text-slate-900 text-sm font-semibold">{user?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-pink-50">
                        <span className="text-pink-900/70 text-sm font-medium">Email Address</span>
                        <span className="text-slate-900 text-sm font-semibold">{user?.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                        <span className="text-pink-900/70 text-sm font-medium">Role</span>
                        <span className="text-xs font-bold bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full capitalize">
                            {user?.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}