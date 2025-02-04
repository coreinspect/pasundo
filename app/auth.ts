import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    signIn({ profile }) {
      if (!profile?.email) return false;
      return allowedEmails.includes(profile.email);
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("http://localhost")) {
        return process.env.NEXTAUTH_URL || "https://pasundo.com";
      }
      return baseUrl;
    },
  },
});
