import { useEffect, useState } from "react";
import UsersTable from "./Users/UsersTable";
import StatsCard from "./Users/StatsCard";
import { FiUserPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import "./Users/Users.css";
import PageHeader from "./shared/PageHeader";
import "./shared/shared.css";

const Users = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkApiConnection();
  });

  const checkApiConnection = async () => {
    try {
      const response = await fetch("https://aws.pasundo.com/api/users/");
      if (response.ok) {
        setIsConnected(true);
        fetchDrivers();
      } else {
        setError(`API Error: ${response.status} ${response.statusText}`);
        setIsConnected(false);
      }
    } catch (error) {
      console.error("API Connection Error:", error);
      setError("Failed to connect to API. Please check your connection.");
      setIsConnected(false);
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch("https://aws.pasundo.com/api/users/");
      const data = await response.json();
      setDrivers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError("Failed to fetch driver data.");
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="users-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={checkApiConnection} className="retry-button">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <PageHeader
        title="Users Management"
        subtitle="Manage your system users here"
        status={{
          isConnected: isConnected,
          label: isConnected
            ? "API Status: Connected"
            : "API Status: Disconnected",
        }}
      />

      <div className="users-list">
        <div className="users-header">
          <StatsCard title="Active Users" value={drivers.length} />
          <div className="user-actions">
            <button className="action-button add">
              <FiUserPlus size={16} /> Add User
            </button>
            <button className="action-button edit">
              <FiEdit size={16} /> Edit
            </button>
            <button className="action-button delete">
              <FiTrash2 size={16} /> Delete
            </button>
          </div>
        </div>
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading user data...</p>
          </div>
        ) : (
          <UsersTable drivers={drivers} />
        )}
      </div>
    </div>
  );
};

export default Users;
