import { useState } from "react";
import "./Users.css";

interface SearchFormProps {
  onSearch: (
    phoneNumber: string,
    setNotFound: (value: boolean) => void
  ) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showError, setShowError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedNumber = phoneNumber.trim();

    if (cleanedNumber.length !== 11) {
      setShowError(true);
      setNotFound(false);
      setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
      return;
    }

    setShowError(false);
    onSearch(cleanedNumber, setNotFound);
    setPhoneNumber("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    setPhoneNumber(value);
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Enter 11-digit phone number..."
          className="search-input"
          maxLength={11}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {showError && (
        <div className="search-error">
          Please enter a valid 11-digit phone number
        </div>
      )}
      {notFound && (
        <div className="search-error">Phone number not found in database</div>
      )}
    </div>
  );
};

export default SearchForm;
