import { FaChartLine, FaCode, FaFire, FaBook, FaTrophy, FaMedal } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", icon: <FaChartLine />, path: "/" },
    { name: "Practice", icon: <FaCode />, path: "/practice" },
    { name: "Streak", icon: <FaFire />, path: "/streak" },
    { name: "Topics", icon: <FaBook />, path: "/topics" },
    { name: "Achievements", icon: <FaTrophy />, path: "/achievements" },
    { name: "Leaderboard", icon: <FaMedal />, path: "/leaderboard" },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>CodeRecall</h2>
      <ul style={styles.menu}>
        {menuItems.map((item, idx) => (
          <li key={idx} style={styles.menuItem}>
            <Link
              to={item.path}
              style={{
                ...styles.link,
                background: location.pathname === item.path ? "#6366f1" : "transparent",
              }}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#1f2937",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    marginBottom: "30px",
    fontSize: "22px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    flex: 1,
  },
  menuItem: {
    marginBottom: "12px",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "0.2s",
  },
};

export default Sidebar;