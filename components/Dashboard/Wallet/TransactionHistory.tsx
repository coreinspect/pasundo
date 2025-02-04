import { memo } from "react";
import { Transaction } from "../../../types/wallet";
import { FaMoneyBillWave, FaPlus, FaMinus } from "react-icons/fa";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistoryComponent = ({
  transactions = [], // Provide default empty array
}: TransactionHistoryProps) => {
  // Debug: Log received transactions
  console.log("Rendering transactions:", {
    count: transactions?.length,
    transactions,
  });

  if (!transactions) {
    console.warn("Transactions is undefined or null");
    return null;
  }

  return (
    <div className="transaction-history">
      <h3>
        Transaction History
        <span>({transactions.length})</span>
      </h3>
      <div className="transactions-list">
        {!transactions || transactions.length === 0 ? (
          <p className="no-transactions">No transactions found</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-icon">
                {transaction.operation_type === "add" ? (
                  <FaPlus className="add-icon" />
                ) : (
                  <FaMinus className="deduct-icon" />
                )}
              </div>
              <div className="transaction-details">
                <div className="transaction-amount">
                  <FaMoneyBillWave />
                  <span
                    className={
                      transaction.operation_type === "add"
                        ? "amount-add"
                        : "amount-deduct"
                    }
                  >
                    ₱{transaction.amount.toLocaleString()}
                  </span>
                </div>
                <div className="transaction-info">
                  <span className="transaction-type">{transaction.type}</span>
                  <span className="transaction-date">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="balance-after">
                  Balance: ₱{transaction.balance_after.toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const TransactionHistory = memo(TransactionHistoryComponent);
