export const allowedEmails =
  process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",").map((email) =>
    email.trim()
  ) || [];
