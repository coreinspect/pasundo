import { FiUserPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import UsersTable from "./Users/UsersTable";
import StatsCard from "./Users/StatsCard";
import PageHeader from "./shared/PageHeader";
import { useUser } from "../../hooks/useUser";
import "./Users/Users.css";
import "./shared/shared.css";
import { useState } from "react";
import AddUserModal from "./Users/AddUserModal";

const Users = () => {
  const {
    drivers,
    loading,
    error,
    isConnected,
    checkApiConnection,
    createUser,
    checkPhoneExists,
  } = useUser();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
            <button
              className="action-button add"
              onClick={() => setIsAddModalOpen(true)}
            >
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

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={createUser}
        checkPhoneExists={checkPhoneExists}
      />
    </div>
  );
};

export default Users;
