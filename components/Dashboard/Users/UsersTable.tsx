import { useState } from "react";
import "./Users.css"; // Updated import
import SearchForm from "./SearchForm";
import SearchPopup from "./SearchPopup";
import { User } from "../../../types/user";

interface UsersTableProps {
  drivers: User[];
}

const UserAvatar = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const initials = `${firstName[0]}${lastName[0]}`;
  return <div className="user-avatar">{initials}</div>;
};

const RoleBadge = ({ role }: { role: string }) => {
  const getIcon = () => {
    switch (role.toLowerCase()) {
      case "admin":
        return "👑";
      case "driver":
        return "🚗";
      case "passenger":
        return "🧑";
      default:
        return "👤";
    }
  };

  return (
    <span className={`role-badge ${role.toLowerCase()}`}>
      {getIcon()} {role}
    </span>
  );
};

const UsersTable: React.FC<UsersTableProps> = ({ drivers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const itemsPerPage = 10;

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString();
  };

  const getRegistrationStatus = (status: boolean | string) => {
    // Convert string "true"/"false" or boolean true/false to boolean
    const isRegistered =
      String(status).toLowerCase() === "true" || status === true;
    return isRegistered ? "Verified" : "Unverified";
  };

  // Sort drivers by date (newest first) and filter out invalid dates
  const sortedDrivers = [...drivers]
    .filter((driver) => !isNaN(new Date(driver.sms_otp_created).getTime()))
    .sort(
      (a, b) =>
        new Date(b.sms_otp_created).getTime() -
        new Date(a.sms_otp_created).getTime()
    );

  // Calculate pagination
  const indexOfLastDriver = currentPage * itemsPerPage;
  const indexOfFirstDriver = indexOfLastDriver - itemsPerPage;
  const currentDrivers = sortedDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );
  const totalPages = Math.ceil(sortedDrivers.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (
    phoneNumber: string,
    setNotFound: (value: boolean) => void
  ) => {
    const result = drivers.find((driver) =>
      driver.phone_number.includes(phoneNumber)
    );
    if (!result) {
      setNotFound(true);
      setTimeout(() => setNotFound(false), 3000);
    }
    setSearchResult(result || null);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="header-content">
          <h3>Recent Registrations</h3>
          <p>
            Showing {indexOfFirstDriver + 1} -{" "}
            {Math.min(indexOfLastDriver, sortedDrivers.length)} of{" "}
            {sortedDrivers.length} users
          </p>
        </div>
        <SearchForm onSearch={handleSearch} />
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>User Details</th>
            <th>Contact</th>
            <th>Role</th>
            <th>Status</th>
            <th>Registered</th>
          </tr>
        </thead>
        <tbody>
          {currentDrivers.map((driver) => (
            <tr key={driver.id}>
              <td>
                <div className="user-cell">
                  <UserAvatar
                    firstName={driver.first_name}
                    lastName={driver.last_name}
                  />
                  <div className="user-details">
                    <span className="user-name">
                      {driver.first_name} {driver.last_name}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div className="phone-cell">
                  <span className="phone-icon">📱</span>
                  {driver.phone_number}
                </div>
              </td>
              <td>
                <RoleBadge role={driver.role} />
              </td>
              <td>
                <span
                  className={`status-badge ${
                    getRegistrationStatus(driver.is_registered) === "Verified"
                      ? "verified"
                      : "unverified"
                  }`}
                >
                  {getRegistrationStatus(driver.is_registered)}
                </span>
              </td>
              <td>
                <span title={new Date(driver.sms_otp_created).toLocaleString()}>
                  {formatRelativeTime(driver.sms_otp_created)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>

        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      <SearchPopup
        driver={searchResult}
        onClose={() => setSearchResult(null)}
      />
    </div>
  );
};

export default UsersTable;
