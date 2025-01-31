import { useState } from "react";

interface WalletResult {
  "Phone Number": string;
  Name: string;
  Type: string;
  Amount: number;
  "Last Transaction": string;
}

interface GetWalletProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetWallet = ({ isOpen, onClose }: GetWalletProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<WalletResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate phone number
    const cleanPhoneNumber = searchQuery.replace(/\D/g, "");
    if (cleanPhoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Fetching wallet data for:", cleanPhoneNumber);
      const response = await fetch(
        `https://aws.pasundo.com/api/wallet/${cleanPhoneNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Origin: window.location.origin,
          },
          mode: "cors",
        }
      );

      console.log("API Response status:", response.status);

      // Handle specific HTTP status codes
      switch (response.status) {
        case 401:
          throw new Error("Session expired. Please login again.");
        case 403:
          throw new Error("You don't have permission to access this wallet.");
        case 404:
          throw new Error("Wallet not found for this phone number.");
        case 500:
          throw new Error("Server error. Please try again later.");
      }

      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Raw API Response data:", data); // Debug log

      // Validate response data
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setError("No wallet found for this phone number");
        setSearchResults([]);
        return;
      }

      // More detailed validation with debug logging
      const validateWalletData = (wallet: unknown): wallet is WalletResult => {
        console.log("Validating wallet data:", wallet); // Debug log
        const isValid =
          typeof wallet === "object" &&
          wallet !== null &&
          "Phone Number" in wallet &&
          "Name" in wallet &&
          "Type" in wallet &&
          "Amount" in wallet &&
          "Last Transaction" in wallet;
        console.log("Validation result:", isValid); // Debug log
        return isValid;
      };

      const processedData = Array.isArray(data) ? data : [data];
      console.log("Processed data:", processedData); // Debug log

      // Check each wallet object
      const validationResults = processedData.map(validateWalletData);
      console.log("Validation results:", validationResults); // Debug log

      if (!processedData.every(validateWalletData)) {
        console.error("Invalid wallet data structure:", processedData); // Debug log
        throw new Error(
          "Invalid wallet data structure. Expected: Phone_Number, Name, Type, Amount, Last Transaction"
        );
      }

      setSearchResults(processedData);
    } catch (err) {
      console.error("Wallet search error:", err);
      if (err instanceof TypeError && err.message.includes("CORS")) {
        setError(
          "Unable to connect to the wallet service. Please contact support."
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching wallet data"
        );
      }
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateUniqueKey = (result: WalletResult) => {
    return `${result["Phone Number"]}-${result.Type}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Search User Wallet</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="tel"
            placeholder="Enter phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="search-results">
          {isLoading ? (
            <div className="loading">Searching wallet...</div>
          ) : searchResults.length > 0 ? (
            <table className="wallet-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Last Transaction</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={generateUniqueKey(result)}>
                    <td>{result.Name}</td>
                    <td>{result["Phone Number"]}</td>
                    <td>{result.Type}</td>
                    <td className="wallet-amount">₱{result.Amount}</td>
                    <td>{result["Last Transaction"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !error && <p className="no-results">No wallet found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetWallet;
