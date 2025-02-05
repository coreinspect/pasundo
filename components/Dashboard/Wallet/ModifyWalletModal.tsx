import { useState } from "react";
import { WalletData } from "../../../types/wallet";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";

interface ModifyWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletData;
  phoneNumber: string; // Add phone number prop
  onModify: (
    phoneNumber: string,
    action: "add" | "deduct",
    amount: number
  ) => Promise<void>;
}

export const ModifyWalletModal = ({
  isOpen,
  onClose,
  wallet,
  phoneNumber,
  onModify,
}: ModifyWalletModalProps) => {
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState<"add" | "deduct">("add");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = parseInt(amount, 10);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await onModify(phoneNumber, action, numericAmount);
      setAmount("");
      onClose();
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Failed to modify wallet"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Modify Wallet Balance</h3>
          <button onClick={onClose} className="close-btn">
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <p className="current-balance">
            Current Balance: ₱{wallet.amount.toLocaleString()}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="action-buttons">
              <button
                type="button"
                className={`action-btn ${action === "add" ? "selected" : ""}`}
                onClick={() => setAction("add")}
              >
                <FaPlus /> Add Money
              </button>
              <button
                type="button"
                className={`action-btn ${
                  action === "deduct" ? "selected" : ""
                }`}
                onClick={() => setAction("deduct")}
              >
                <FaMinus /> Deduct Money
              </button>
            </div>
            <div className="amount-input">
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (parseInt(value, 10) >= 0 || value === "") {
                    setAmount(value);
                  }
                }}
                min="1"
                step="1"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Modification"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
