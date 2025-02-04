import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedEmails =
  process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",").map((email) =>
    email.trim()
  ) || [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Add error page
  },
  callbacks: {
    async signIn({ profile }) {
      try {
        if (!profile?.email) return false;
        return allowedEmails.includes(profile.email.toLowerCase());
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Only allow redirects to trusted domains
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
});
