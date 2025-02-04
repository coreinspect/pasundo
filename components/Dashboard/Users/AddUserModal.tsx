import { useState, useEffect, useCallback } from "react";
import { FiUserPlus } from "react-icons/fi";
import { CreateUserData } from "../../../types/user";
import "./Users.css";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: CreateUserData) => Promise<void>;
  checkPhoneExists: (phoneNumber: string) => Promise<boolean>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  checkPhoneExists,
}) => {
  const [formData, setFormData] = useState<CreateUserData>({
    first_name: "",
    last_name: "",
    is_registered: false,
    phone_number: "",
    role: "passenger",
    type: "normal",
    sms_otp_code: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [phoneTimeout, setPhoneTimeout] = useState<NodeJS.Timeout | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccessActions, setShowSuccessActions] = useState(false);

  const validatePhoneNumber = useCallback(
    async (phoneNumber: string) => {
      // Remove any non-digit characters for validation
      const cleanNumber = phoneNumber.replace(/\D/g, "");

      if (cleanNumber.length === 0) {
        setPhoneError("Phone number is required");
      } else if (cleanNumber.length !== 11) {
        setPhoneError("Phone number must be 11 digits");
      } else {
        try {
          const exists = await checkPhoneExists(cleanNumber);
          if (exists) {
            setPhoneError("This phone number is already registered");
          } else {
            setPhoneError(null);
          }
        } catch {
          setPhoneError("Failed to validate phone number");
        }
      }
    },
    [checkPhoneExists]
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Only allow digits and limit to 11 characters
    const cleanNumber = input.replace(/\D/g, "").slice(0, 11);

    setFormData({ ...formData, phone_number: cleanNumber });

    if (phoneTimeout) {
      clearTimeout(phoneTimeout);
    }

    const timeout = setTimeout(() => {
      validatePhoneNumber(cleanNumber);
    }, 300);

    setPhoneTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (phoneTimeout) {
        clearTimeout(phoneTimeout);
      }
    };
  }, [phoneTimeout]);

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      is_registered: false,
      phone_number: "",
      role: "passenger",
      type: "normal",
      sms_otp_code: "",
    });
    setPhoneError(null);
    setError(null);
    setSuccessMessage(null);
    setShowSuccessActions(false);
  };

  // Reset form and errors when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    const isComplete =
      formData.first_name.trim() !== "" &&
      formData.last_name.trim() !== "" &&
      formData.phone_number.trim() !== "" &&
      !phoneError;

    setIsFormValid(isComplete);
  }, [formData, phoneError]);

  if (!isOpen) return null;

  const handleAddAnother = () => {
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Format phone number if needed
      const formattedData = {
        ...formData,
        phone_number: formData.phone_number.replace(/\D/g, ""), // Remove non-digits
      };

      await onSubmit(formattedData);
      setSuccessMessage(
        `User ${formData.first_name} ${formData.last_name} has been successfully created!`
      );
      setShowSuccessActions(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create user. Please check your input and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          <FiUserPlus size={24} />
          Add New User
        </h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">
            {successMessage}
            {showSuccessActions && (
              <div className="success-actions">
                <button
                  onClick={handleAddAnother}
                  className="action-button add"
                >
                  Add Another User
                </button>
                <button onClick={onClose} className="action-button close">
                  Close
                </button>
              </div>
            )}
          </div>
        )}
        {!showSuccessActions && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                required
                pattern="[0-9]{11}"
                placeholder="Enter 11 digit phone number"
                maxLength={11}
                value={formData.phone_number}
                onChange={handlePhoneChange}
                className={phoneError ? "input-error" : ""}
              />
              {phoneError && <div className="field-error">{phoneError}</div>}
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as CreateUserData["role"],
                  })
                }
              >
                <option value="passenger">Passenger</option>
                <option value="driver">Driver</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as CreateUserData["type"],
                  })
                }
              >
                <option value="normal">Normal</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" disabled={loading || !isFormValid}>
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddUserModal;
