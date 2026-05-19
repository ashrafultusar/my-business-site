"use server";

import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";
import { signIn, signOut } from "@/auth";
import { getUserByEmail } from "@/lib/data/getUser";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


// REGISTER — POST (create new user)
// 
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


// LOGIN — POST (sign in via NextAuth credentials)

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


// LOGOUT — POST (sign out)

export async function logoutUser() {
    await signOut({ redirect: false });
    redirect("/login");
}

// Delete User Action
export async function deleteUserAction(userId: string) {
    try {
        await connectDB();
        await User.findByIdAndDelete(userId);
        revalidatePath("/admin/users"); // Apnar exact route line ta refresh hobe
        return { success: true, message: "User deleted successfully" };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to delete user" };
    }
}


// Update User Role Action
export async function updateUserRoleAction(userId: string, role: "admin" | "moderator" | "user") {
    try {
        await connectDB();
        await User.findByIdAndUpdate(userId, { role });
        revalidatePath("/admin/users");
        return { success: true, message: "Role updated successfully" };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to update role" };
    }
}