"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/actions/auth.actions";

export default function LoginPage() {
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
        const result = await loginUser(formData);

        setLoading(false);

        if (result?.error) {
            setError(result.error);
        } else {
            setSuccess(result?.success ?? "Logged in!");
            router.push("/my-dashboard");
            router.refresh();
        }
    }

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🔐</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
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
                    <label className="block text-sm text-slate-300 mb-1.5">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    {loading ? "Signing in…" : "Sign In"}
                </button>
            </form>

            {/* Footer */}
            <p className="text-center text-slate-500 text-sm mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition">
                    Sign up
                </Link>
            </p>
        </div>
    );
}