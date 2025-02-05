import Dashboard from "@/components/Dashboard/Dashboard";
import { SessionProvider } from "next-auth/react";

export default function page() {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  );
}
