import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}

const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        if (!profile?.email) return false;
        return allowedEmails.includes(profile.email);
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
  },
  secret: process.env.AUTH_SECRET,
});
