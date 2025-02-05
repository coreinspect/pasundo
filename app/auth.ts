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
  },
});
