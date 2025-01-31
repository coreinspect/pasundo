import "./Users.css"; // Updated import

const StatsCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatsCard;
