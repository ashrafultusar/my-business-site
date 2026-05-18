"use server";

import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";
import { signIn, signOut } from "@/auth";
import { getUserByEmail, getUserById } from "@/lib/data/getUser";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─────────────────────────────────────────────
// REGISTER — POST (create new user)
// ─────────────────────────────────────────────
export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validation
    if (!name || !email || !password) {
        return { error: "All fields are required" };
    }
    if (password.length < 6) {
        return { error: "Password must be at least 6 characters" };
    }

    try {
        await connectDB();

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return { error: "An account with this email already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: "user",
        });

        return { success: "Account created successfully! You can now log in." };
    } catch (error) {
        console.error("registerUser error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

// ─────────────────────────────────────────────
// LOGIN — POST (sign in via NextAuth credentials)
// ─────────────────────────────────────────────
export async function loginUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return { success: "Logged in successfully!" };
    } catch (error: unknown) {
        const err = error as { type?: string; message?: string };
        if (err?.type === "CredentialsSignin") {
            return { error: "Invalid email or password" };
        }
        console.error("loginUser error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

// ─────────────────────────────────────────────
// LOGOUT — POST (sign out)
// ─────────────────────────────────────────────
export async function logoutUser() {
    await signOut({ redirect: false });
    redirect("/login");
}

// ─────────────────────────────────────────────
// UPDATE PROFILE — EDIT (update name & email)
// ─────────────────────────────────────────────
export async function updateUserProfile(userId: string, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || !email) {
        return { error: "Name and email are required" };
    }

    try {
        await connectDB();

        const existingUser = await getUserById(userId);
        if (!existingUser) {
            return { error: "User not found" };
        }

        // Check if new email is taken by someone else
        if (email.toLowerCase() !== existingUser.email) {
            const emailTaken = await getUserByEmail(email);
            if (emailTaken) {
                return { error: "This email is already in use by another account" };
            }
        }

        await User.findByIdAndUpdate(userId, {
            name: name.trim(),
            email: email.toLowerCase().trim(),
        });

        revalidatePath("/my-dashboard");
        return { success: "Profile updated successfully!" };
    } catch (error) {
        console.error("updateUserProfile error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

// ─────────────────────────────────────────────
// CHANGE PASSWORD — EDIT
// ─────────────────────────────────────────────
export async function changePassword(userId: string, formData: FormData) {
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return { error: "All password fields are required" };
    }
    if (newPassword.length < 6) {
        return { error: "New password must be at least 6 characters" };
    }
    if (newPassword !== confirmPassword) {
        return { error: "New passwords do not match" };
    }

    try {
        await connectDB();

        // Fetch user with password (select: false by default)
        const user = await User.findById(userId).select("+password");
        if (!user) {
            return { error: "User not found" };
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return { error: "Current password is incorrect" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        return { success: "Password changed successfully!" };
    } catch (error) {
        console.error("changePassword error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

// ─────────────────────────────────────────────
// DELETE USER — DELETE (admin action)
// ─────────────────────────────────────────────
export async function deleteUser(userId: string) {
    try {
        await connectDB();

        const user = await getUserById(userId);
        if (!user) {
            return { error: "User not found" };
        }

        await User.findByIdAndDelete(userId);

        revalidatePath("/my-dashboard");
        return { success: "User deleted successfully!" };
    } catch (error) {
        console.error("deleteUser error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}
