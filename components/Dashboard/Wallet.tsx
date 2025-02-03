"use client";
import { useState, useCallback, useEffect } from "react";
import { SearchResults, WalletData, Transaction } from "./types/wallet";
import { useWallet } from "./hooks/useWallet";
import { WalletSearchResults } from "./Wallet/SearchResults";
import PageHeader from "./shared/PageHeader";
import { FaSearch } from "react-icons/fa";
import "./shared/shared.css";
import "./Wallet/Wallet.css";
import { ModifyWalletModal } from "./Wallet/ModifyWalletModal";
import { useTransactions } from "./hooks/useTransactions";
import { TransactionModal } from "./Wallet/TransactionModal";

const Wallet = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(""); // Add this line
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [isApiConnected, setIsApiConnected] = useState(true); // Add API connection state
  const { isLoading, error, searchWallet, modifyWalletBalance } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { fetchTransactions } = useTransactions();
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  useEffect(() => {
    setIsApiConnected(!error);
  }, [error]);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Reset both errors at the start
      setPhoneError("");

      // Validation checks for phone number format
      if (!phoneNumber) {
        setPhoneError("Phone number is required");
        return;
      }

      if (phoneNumber.length !== 11) {
        setPhoneError("Phone number must be 11 digits");
        return;
      }

      if (!/^\d+$/.test(phoneNumber)) {
        setPhoneError("Phone number must contain only digits");
        return;
      }

      // If we reach here, phone number format is valid, proceed with search
      try {
        const results = await searchWallet(phoneNumber);
        if (results) {
          setSearchResults(results);
          console.log("Wallet found, fetching transactions...");

          const transactionHistory = await fetchTransactions(phoneNumber);
          console.log("Transaction history received:", transactionHistory);

          setTransactions(transactionHistory || []);
        }
      } catch (error) {
        console.error("Search error:", error);
        setTransactions([]);
      }
    },
    [phoneNumber, searchWallet, fetchTransactions]
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 11 && /^\d*$/.test(value)) {
      setPhoneNumber(value);
      setPhoneError("");
    }
  };

  const handleModifyWallet = useCallback((wallet: WalletData) => {
    setSelectedWallet(wallet);
    setShowModifyModal(true);
  }, []);

  const handleModifyAction = async (
    phoneNumber: string,
    action: "add" | "deduct",
    amount: number
  ) => {
    if (!phoneNumber || !action || !amount) return;

    try {
      const result = await modifyWalletBalance(phoneNumber, action, amount);

      if (result) {
        if (searchResults && searchResults.wallet) {
          setSearchResults({
            ...searchResults,
            wallet: {
              ...searchResults.wallet,
              amount: result.new_balance,
            },
          });
        }
        setShowModifyModal(false);
      }
    } catch (error) {
      // Handle error silently or show in UI
      setError(
        error instanceof Error ? error.message : "Failed to modify wallet"
      );
    }
  };

  const handleViewTransactions = useCallback(() => {
    setShowTransactionModal(true);
  }, []);

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
            placeholder="Enter 11-digit phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <FaSearch className="btn-icon" /> Search Wallet
          </button>
        </form>
        {/* Show phone format error if present, otherwise show search error */}
        {phoneError ? (
          <p className="error-message">{phoneError}</p>
        ) : (
          error && <p className="error-message">{error}</p>
        )}
        {isLoading && <div className="loading">Searching...</div>}
        {searchResults && (
          <>
            <WalletSearchResults
              results={searchResults}
              onModify={() => handleModifyWallet(searchResults.wallet)}
              onDelete={handleViewTransactions}
            />
            {showTransactionModal && (
              <TransactionModal
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                transactions={transactions}
              />
            )}
          </>
        )}
      </div>
      {showModifyModal && selectedWallet && (
        <ModifyWalletModal
          isOpen={showModifyModal}
          onClose={() => setShowModifyModal(false)}
          wallet={selectedWallet}
          phoneNumber={searchResults?.user?.phone_number || ""}
          onModify={handleModifyAction}
        />
      )}
    </div>
  );
};

export default Wallet;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
