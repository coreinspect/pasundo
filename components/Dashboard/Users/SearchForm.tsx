import { useState } from "react";
import "./Users.css";

interface SearchFormProps {
  onSearch: (phoneNumber: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      onSearch(phoneNumber.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Search by phone number..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
