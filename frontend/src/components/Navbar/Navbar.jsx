// src/components/Navbar/Navbar.jsx
function Navbar() {
  return (
    <div style={styles.navbar}>
      <h1 style={styles.title}>Welcome back, Kaniga 👋</h1>
      <p style={styles.subtitle}>Your coding streak is on fire! 🔥 Keep it going.</p>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#f3f4f6",
    padding: "20px 30px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#111827",
  },
  subtitle: {
    fontSize: "18px",
    color: "#4b5563",
  },
};

export default Navbar;