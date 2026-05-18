"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/actions/auth.actions";

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await registerUser(formData);

        setLoading(false);

        if (result?.error) {
            setError(result.error);
        } else {
            setSuccess(result?.success ?? "Account created!");
            setTimeout(() => router.push("/login"), 1500);
        }
    }

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Create account</h1>
                <p className="text-slate-400 text-sm mt-1">Join us today</p>
            </div>

            {/* Alerts */}
            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                    {success}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        minLength={2}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={6}
                        placeholder="Min 6 characters"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    {loading ? "Creating account…" : "Create Account"}
                </button>
            </form>

            {/* Footer */}
            <p className="text-center text-slate-500 text-sm mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition">
                    Sign in
                </Link>
            </p>
        </div>
    );
}