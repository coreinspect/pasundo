"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { allowedEmails } from "@/config/auth";
import "./dashboard.css";
import { FaUsers, FaWallet, FaChartBar, FaHome, FaBars } from "react-icons/fa";
import Users from "./Users";
import Wallet from "./Wallet";
import Reports from "./Reports";
import Image from "next/image";

const DashboardClient = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const isAuthorized = userEmail && allowedEmails.includes(userEmail);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="error-message">
        <p>Please sign in to access the dashboard</p>
        <Link href="/login" className="login-link">
          Go to Login
        </Link>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="error-message">
        <p>Access Denied</p>
        <button className="sign-out-button" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    );
  }

  const renderContent = () => {
    try {
      switch (activeSection) {
        case "users":
          return <Users />;
        case "wallet":
          return <Wallet />;
        case "reports":
          return <Reports />;
        case "overview":
        default:
          return (
            <>
              <div className="welcome-section">
                <h1>Welcome, Pasundo Admin</h1>
                <p>Here&apos;s your overview for today</p>
              </div>
              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p>1,234</p>
                </div>
                <div className="stat-card">
                  <h3>Active Wallets</h3>
                  <p>892</p>
                </div>
                <div className="stat-card">
                  <h3>Monthly Reports</h3>
                  <p>56</p>
                </div>
                <div className="stat-card">
                  <h3>Total Revenue</h3>
                  <p>45,670</p>
                </div>
              </div>
            </>
          );
      }
    } catch (error) {
      console.error("Dashboard render error:", error);
      return <div>Something went wrong. Please try again.</div>;
    }
  };

  return (
    <div className="dashboard-layout">
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay show"
          onClick={() => {
            setIsMobileMenuOpen(false);
            document.body.style.overflow = "auto";
          }}
        />
      )}

      <nav className={`dashboard-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="nav-header">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={300}
            height={300}
            className="logo"
          />
          <h2>Admin Panel</h2>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <FaBars />
          </button>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "show" : ""}`}>
          <li
            className={`nav-item ${
              activeSection === "overview" ? "active" : ""
            }`}
          >
            <a
              onClick={() => handleNavClick("overview")}
              style={{ cursor: "pointer" }}
            >
              <FaHome /> Overview
            </a>
          </li>
          <li
            className={`nav-item ${activeSection === "users" ? "active" : ""}`}
          >
            <a
              onClick={() => handleNavClick("users")}
              style={{ cursor: "pointer" }}
            >
              <FaUsers /> Users
            </a>
          </li>
          <li
            className={`nav-item ${activeSection === "wallet" ? "active" : ""}`}
          >
            <a
              onClick={() => handleNavClick("wallet")}
              style={{ cursor: "pointer" }}
            >
              <FaWallet /> Wallet
            </a>
          </li>
          <li
            className={`nav-item ${
              activeSection === "reports" ? "active" : ""
            }`}
          >
            <a
              onClick={() => handleNavClick("reports")}
              style={{ cursor: "pointer" }}
            >
              <FaChartBar /> Reports
            </a>
          </li>
        </ul>

        <div className="nav-footer">
          <p className="user-email">{userEmail}</p>
          <button className="sign-out-button" onClick={() => signOut()}>
            Sign Out
          </button>
          <p className="admin-label">Administrator</p>
        </div>
      </nav>

      <main className="dashboard-main">{renderContent()}</main>
    </div>
  );
};

export default DashboardClient;
