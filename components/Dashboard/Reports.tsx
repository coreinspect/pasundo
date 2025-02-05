import PageHeader from "./shared/PageHeader";
import "./shared/shared.css";

const Reports = () => {
  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="View detailed reports and statistics"
      />

      <div className="reports-stats">
        <div className="stat-card">
          <h3>Monthly Report</h3>
          <p>24</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>45,670</p>
        </div>
        <div className="stat-card">
          <h3>Growth Rate</h3>
          <p>+15%</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
