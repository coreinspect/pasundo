import { useState } from "react";
import { Transaction } from "../../../types/wallet";
import {
  FaClock,
  FaPlus,
  FaMinus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

const ITEMS_PER_PAGE = 10;

export const TransactionModal = ({
  isOpen,
  onClose,
  transactions,
}: TransactionModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!isOpen) return null;

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="modal-overlay">
      <div className="modal-content transaction-modal">
        <div className="modal-header">
          <h3>
            <FaClock /> Transaction History
          </h3>
          <button onClick={onClose} className="close-btn">
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <span className="transaction-type-icon">
                      {transaction.operation_type === "add" ? (
                        <FaPlus className="add-icon" />
                      ) : (
                        <FaMinus className="deduct-icon" />
                      )}
                    </span>
                  </td>
                  <td
                    className={
                      transaction.operation_type === "add"
                        ? "amount-add"
                        : "amount-deduct"
                    }
                  >
                    ₱{transaction.amount.toLocaleString()}
                  </td>
                  <td>₱{transaction.balance_after.toLocaleString()}</td>
                  <td>
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="pagination-btn"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
