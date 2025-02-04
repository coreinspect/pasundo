import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    signIn({ profile }) {
      if (!profile?.email) return false;
      return allowedEmails.includes(profile.email);
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Ensure the URL is redirecting to pasundo.com or www.pasundo.com
      const origin = new URL(url).origin;
      if (origin === "http://localhost:3000") return "https://pasundo.com";
      if (origin === "http://localhost:3000") return "https://www.pasundo.com";
      return url;
    },
  },
});
