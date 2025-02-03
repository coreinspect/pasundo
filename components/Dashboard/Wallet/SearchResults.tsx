import { memo } from "react";
import { SearchResults } from "../types/wallet";
import {
  FaSearch,
  FaUser,
  FaPhone,
  FaUserTag,
  FaWallet,
  FaMoneyBillWave,
  FaIdCard,
  FaEdit,
  FaHistory, // Replace FaTrashAlt with FaHistory
} from "react-icons/fa";

interface SearchResultsProps {
  results: SearchResults;
  onModify: () => void;
  onDelete: () => void; // Keep for backward compatibility but rename in next update
}

const SearchResultsComponent = ({
  results,
  onModify,
  onDelete: viewTransactions, // Rename the prop usage
}: SearchResultsProps) => {
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
          {results.user && (
            <>
              <p>
                <FaUser className="icon" />
                <strong>Name:</strong>
                <span>
                  {results.user.first_name || "N/A"}{" "}
                  {results.user.last_name || "N/A"}
                </span>
              </p>
              <p>
                <FaPhone className="icon" />
                <strong>Phone:</strong>
                <span>{results.user.phone_number || "N/A"}</span>
              </p>
              <p>
                <FaUserTag className="icon" />
                <strong>Role:</strong>
                <span>{(results.user.role || "N/A").toUpperCase()}</span>
              </p>
            </>
          )}
        </div>
        <div className="info-group">
          <h4>
            <FaWallet className="info-icon" /> Wallet Details
          </h4>
          {results.wallet && (
            <>
              <p>
                <FaMoneyBillWave className="icon" />
                <strong>Balance:</strong>
                <span className="balance-amount">
                  ₱{results.wallet.amount.toLocaleString() || 0}
                </span>
              </p>
              <p>
                <FaIdCard className="icon" />
                <strong>User ID:</strong>
                <span>{results.wallet.user_id || "N/A"}</span>
              </p>
              <div className="wallet-modify-actions">
                <button onClick={onModify} className="wallet-btn edit-btn">
                  <FaEdit className="btn-icon" />
                  Modify
                </button>
                <button
                  onClick={viewTransactions}
                  className="wallet-btn history-btn"
                >
                  <FaHistory className="btn-icon" />
                  Transactions
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const WalletSearchResults = memo(SearchResultsComponent);
WalletSearchResults.displayName = "WalletSearchResults";
