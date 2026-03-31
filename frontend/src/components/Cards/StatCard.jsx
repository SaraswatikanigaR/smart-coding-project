function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.title}>{title}</p>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "180px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.2s",
  },
  title: { fontSize: "14px", color: "#6b7280" },
  value: { marginTop: "5px", fontSize: "20px" },
};

export default StatCard;