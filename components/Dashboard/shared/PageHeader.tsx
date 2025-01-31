interface PageHeaderProps {
  title: string;
  subtitle: string;
  status?: {
    isConnected: boolean;
    label: string;
  };
}

const PageHeader = ({ title, subtitle, status }: PageHeaderProps) => {
  return (
    <div className="page-header">
      <div className="header-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {status && (
        <div
          className={`header-status ${
            status.isConnected ? "status-connected" : "status-disconnected"
          }`}
        >
          {status.label}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
