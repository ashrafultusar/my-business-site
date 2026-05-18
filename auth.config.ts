import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      const { pathname } = nextUrl;

      const isOnDashboard = pathname.startsWith("/my-dashboard");
      const isLoginPage = pathname.startsWith("/login");

      if (isOnDashboard) {
        if (!isLoggedIn) return false;
        if (userRole === "admin" || userRole === "moderator") return true;
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL("/my-dashboard", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;