import "./Users.css";

interface Driver {
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  status: string;
  is_registered: string;
  sms_otp_created: string;
}

interface SearchPopupProps {
  driver: Driver | null;
  onClose: () => void;
}

const RoleIcon = ({ role }: { role: string }) => {
  const getIcon = () => {
    switch (role.toLowerCase()) {
      case "admin":
        return "👑";
      case "driver":
        return "🚗";
      default:
        return "👤";
    }
  };

  return <div className={`role-icon ${role.toLowerCase()}`}>{getIcon()}</div>;
};

const ItemIcon = ({ type }: { type: string }) => {
  const getIcon = () => {
    switch (type) {
      case "name":
        return "👤";
      case "phone":
        return "📱";
      case "status":
        return "🔔";
      case "registered":
        return "📅";
      default:
        return "📋";
    }
  };

  return <div className={`item-icon ${type}`}>{getIcon()}</div>;
};

const SearchPopup = ({ driver, onClose }: SearchPopupProps) => {
  if (!driver) return null;

  const getRegistrationStatus = (status: boolean | string) => {
    const isRegistered =
      String(status).toLowerCase() === "true" || status === true;
    return isRegistered ? "Verified" : "Unverified";
  };

  return (
    <div className="search-popup-overlay">
      <div className="search-popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Search Result</h3>
        <div className="search-result">
          <div className="item-header">
            <ItemIcon type="name" />
            <div className="item-content">
              <div className="item-label">Name</div>
              <div className="item-value">
                {driver.first_name} {driver.last_name}
              </div>
            </div>
          </div>

          <div className="item-header">
            <ItemIcon type="phone" />
            <div className="item-content">
              <div className="item-label">Phone Number</div>
              <div className="item-value">{driver.phone_number}</div>
            </div>
          </div>

          <div className="role-header">
            <RoleIcon role={driver.role} />
            <div className="role-content">
              <div className="role-label">Role</div>
              <div className="role-value">{driver.role}</div>
            </div>
          </div>

          <div className="item-header">
            <ItemIcon type="status" />
            <div className="item-content">
              <div className="item-label">Status</div>
              <div className="item-value">
                <span
                  className={`status-badge ${
                    getRegistrationStatus(driver.is_registered) === "Verified"
                      ? "verified"
                      : "unverified"
                  }`}
                >
                  {getRegistrationStatus(driver.is_registered)}
                </span>
              </div>
            </div>
          </div>

          <div className="item-header">
            <ItemIcon type="registered" />
            <div className="item-content">
              <div className="item-label">Registered Date</div>
              <div className="item-value">
                {new Date(driver.sms_otp_created).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
