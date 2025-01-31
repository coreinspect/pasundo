"use client";
import { useState, useEffect } from "react";
import PageHeader from "./shared/PageHeader";
import "./shared/shared.css";
import "./Wallet/Wallet.css";
import {
  FaWallet,
  FaSearch,
  FaUser,
  FaPhone,
  FaUserTag,
  FaMoneyBillWave,
  FaIdCard,
} from "react-icons/fa";

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
}

interface WalletData {
  user_id: string;
  amount: number;
  phone_number: string;
}

interface SearchResults {
  wallet: WalletData;
  user: UserData;
}

const Wallet = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    try {
      const response = await fetch("https://aws.pasundo.com/api/wallet/");
      setIsApiConnected(response.ok);
    } catch (error) {
      setIsApiConnected(false);
      console.error("API connection error:", error);
    }
  };

  const formatPhoneNumber = (phone: string | undefined | null): string => {
    if (!phone) return "";

    try {
      // Remove any non-digit characters
      const cleaned = phone.toString().replace(/\D/g, "");

      // For numbers starting with '09', keep as is
      if (cleaned.startsWith("09") && cleaned.length === 11) {
        return cleaned;
      }
      return cleaned;
    } catch (error) {
      console.error("Error formatting phone number:", error);
      return "";
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSearchResults(null);
    setIsLoading(true);

    if (!phoneNumber || phoneNumber.length < 11) {
      setError("Please enter a valid 11-digit phone number");
      setIsLoading(false);
      return;
    }

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    try {
      // First fetch user information by phone number
      const usersResponse = await fetch(`https://aws.pasundo.com/api/users/`);

      if (!usersResponse.ok) {
        throw new Error(`Users API error: ${usersResponse.statusText}`);
      }

      const usersData = await usersResponse.json();

      if (!usersData || !Array.isArray(usersData)) {
        throw new Error("Error fetching user data");
      }

      // Find user with matching phone number
      const matchingUser = usersData.find((user: UserData) => {
        const userPhone = formatPhoneNumber(user.phone_number);
        return userPhone === formattedPhoneNumber;
      });

      if (!matchingUser) {
        throw new Error("No user found with this phone number");
      }

      // Then fetch wallet information using user ID
      const walletResponse = await fetch(`https://aws.pasundo.com/api/wallet/`);
      const walletData = await walletResponse.json();

      if (!walletData || !Array.isArray(walletData)) {
        throw new Error("Error fetching wallet data");
      }

      // Find wallet with matching user_id
      const matchingWallet = walletData.find(
        (wallet: WalletData) => wallet.user_id === matchingUser.id
      );

      if (!matchingWallet) {
        throw new Error("No wallet found for this user");
      }

      // Combine the matched data
      const combinedData: SearchResults = {
        wallet: matchingWallet,
        user: matchingUser,
      };

      setSearchResults(combinedData);
    } catch (error) {
      console.error(
        "Search failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderSearchResults = () => {
    if (isLoading) {
      return <div className="loading">Searching...</div>;
    }

    if (!searchResults) return null;

    return (
      <div className="search-results">
        <h3>
          <FaSearch className="info-icon" />
          Search Results
        </h3>
        <div className="user-wallet-info">
          <div className="info-group">
            <h4>
              <FaUser className="info-icon" /> User Details
            </h4>
            {searchResults.user && (
              <>
                <p>
                  <FaUser className="icon" />
                  <strong>Name:</strong>
                  <span>
                    {searchResults.user.first_name || "N/A"}{" "}
                    {searchResults.user.last_name || "N/A"}
                  </span>
                </p>
                <p>
                  <FaPhone className="icon" />
                  <strong>Phone:</strong>
                  <span>{searchResults.user.phone_number || "N/A"}</span>
                </p>
                <p>
                  <FaUserTag className="icon" />
                  <strong>Role:</strong>
                  <span>{searchResults.user.role || "N/A"}</span>
                </p>
              </>
            )}
          </div>
          <div className="info-group">
            <h4>
              <FaWallet className="info-icon" /> Wallet Details
            </h4>
            {searchResults.wallet && (
              <>
                <p>
                  <FaMoneyBillWave className="icon" />
                  <strong>Balance:</strong>
                  <span className="balance-amount">
                    ₱{searchResults.wallet.amount.toLocaleString() || 0}
                  </span>
                </p>
                <p>
                  <FaIdCard className="icon" />
                  <strong>User ID:</strong>
                  <span>{searchResults.wallet.user_id || "N/A"}</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="Pasundo Wallet Management"
        subtitle="Monitor and manage wallet transactions"
        status={{
          isConnected: isApiConnected,
          label: `API Status: ${isApiConnected ? "Connected" : "Disconnected"}`,
        }}
      />
      <div className="wallet-sections-grid">
        <div className="recent-users-section">
          <h2>Recent Registered Users Wallet</h2>
          <div className="user-list">
            {/* Add your recent users list implementation here */}
            <p>No recent registrations</p>
          </div>
        </div>

        <div className="updated-users-section">
          <h2>Latest Updated Users Wallet</h2>
          <div className="user-list">
            {/* Add your updated users list implementation here */}
            <p>No recent updates</p>
          </div>
        </div>
      </div>
      <div className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <FaSearch className="btn-icon" /> Search Wallet
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {searchResults && renderSearchResults()}
      </div>
    </div>
  );
};

export default Wallet;
