import { connectDB } from "@/db/dbConfig";
import User, { IUser } from "@/models/User";
import { auth } from "@/auth";

// GET user by email
export async function getUserByEmail(email: string): Promise<IUser | null> {
    try {
        await connectDB();
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        return user;
    } catch (error) {
        console.error("getUserByEmail error:", error);
        return null;
    }
}

// GET user by ID
export async function getUserById(id: string): Promise<IUser | null> {
    try {
        await connectDB();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.error("getUserById error:", error);
        return null;
    }
}

// GET all users (admin only)
export async function getAllUsers(): Promise<IUser[]> {
    try {
        await connectDB();
        const users = await User.find({}).sort({ createdAt: -1 });
        return users;
    } catch (error) {
        console.error("getAllUsers error:", error);
        return [];
    }
}

// GET currently authenticated user from session + DB
export async function getCurrentUser(): Promise<IUser | null> {
    try {
        const session = await auth();
        if (!session?.user?.id) return null;

        const user = await getUserById(session.user.id);
        return user;
    } catch (error) {
        console.error("getCurrentUser error:", error);
        return null;
    }
}
