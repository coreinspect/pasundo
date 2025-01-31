import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import "./loginform.css";
import { auth, signIn } from "@/auth";

const LoginForm = async () => {
  const session = await auth();
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <Image
          src={"/images/logo.png"}
          alt="logo"
          width={300}
          height={300}
          className="logo"
        />
        <h1 className="login-title">Welcome Back</h1>
        {!session ? (
          <form
            className="social-button google-button"
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <FcGoogle size={24} />
            <button type="submit">Login with Google</button>
          </form>
        ) : (
          <div className="logged-in-content">
            <p>
              You are already logged in as <span>{session.user?.email}</span>
            </p>
            <Link href="/dashboard" className="dashboard-button">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
