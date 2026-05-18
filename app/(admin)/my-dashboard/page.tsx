import { getCurrentUser } from "@/lib/data/getUser";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Welcome back, {user?.name?.split(" ")[0]} 👋
                </h1>
                <p className="text-slate-400 mt-1">
                    Here&apos;s what&apos;s happening in your dashboard.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
                    <p className="text-slate-400 text-sm">Account Type</p>
                    <p className="text-white text-2xl font-bold mt-1 capitalize">{user?.role}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white text-lg font-semibold mt-1 truncate">{user?.email}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6">
                    <p className="text-slate-400 text-sm">Member Since</p>
                    <p className="text-white text-xl font-bold mt-1">
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
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4">Account Details</h2>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-slate-400 text-sm">Full Name</span>
                        <span className="text-white text-sm font-medium">{user?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-slate-400 text-sm">Email Address</span>
                        <span className="text-white text-sm font-medium">{user?.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                        <span className="text-slate-400 text-sm">Role</span>
                        <span className="text-sm bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full capitalize">
                            {user?.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}