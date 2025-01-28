"use client";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import "./loginform.css";

export default function LoginForm() {
  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    console.log("Google login clicked");
  };

  const handleGithubLogin = () => {
    // Implement GitHub OAuth login
    console.log("GitHub login clicked");
  };

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

        <button
          className="social-button google-button"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={24} />
          Login with Google
        </button>

        <button
          className="social-button github-button"
          onClick={handleGithubLogin}
        >
          <FaGithub size={24} />
          Login with GitHub
        </button>
      </div>
    </div>
  );
}
