import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import StatCard from "../../components/Cards/StatCard";
import ProgressChart from "../../components/Charts/ProgressChart";
import TopicStrengthChart from "../../components/Charts/TopicStrengthChart";
import DifficultyChart from "../../components/Charts/DifficultyChart";
import SuggestedPractice from "../../components/Recommendations/RecommendedPractice";
import Achievements from "../../components/Achievements/Achievements";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/user/1")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) return <div style={styles.loading}>Loading...</div>;

  // Highlight current day in weekly progress (Monday=0, Sunday=6)
  const todayIndex = new Date().getDay();
  const currentDay = todayIndex === 0 ? 6 : todayIndex - 1;

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <Navbar />

        {/* Stats Cards */}
        <div style={styles.cards}>
          <StatCard title="Problems Solved Today" value={user.problemsSolved} />
          <StatCard title="Accuracy" value={`${user.accuracy}%`} />
          <StatCard title="Active Coding Time" value={`${Math.floor(user.activeCodingTime/60)}h ${user.activeCodingTime%60}m`} />
          <StatCard title="Current Streak" value={`${user.streak} Days 🔥`} />
        </div>

        {/* Weekly Progress Chart */}
        <div style={styles.fullWidthChart}>
          <ProgressChart user={user} currentDay={currentDay} />
        </div>

        {/* Topic Strength */}
        <div style={styles.fullWidthChart}>
          <TopicStrengthChart topics={user.topicsProgress} />
        </div>

        {/* Bottom Row */}
        <div style={styles.bottomRow}>
          <div style={styles.leftChart}>
            <DifficultyChart distribution={user.difficultyDistribution} />
          </div>
          <div style={styles.rightChart}>
            <SuggestedPractice suggested={user.suggestedPractice} />
          </div>
        </div>

        {/* Achievements */}
        <div style={styles.achievementsSection}>
          <h2 style={styles.sectionTitle}>Your Achievements</h2>
          <Achievements badges={user.badges} horizontal={true} gamified={true} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", background: "#f5f7fb" },
  main: { flex: 1, padding: "25px", display: "flex", flexDirection: "column", overflowY: "auto" },
  cards: { display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "25px" },
  fullWidthChart: { width: "100%", marginBottom: "25px", minHeight: "300px" },
  bottomRow: { display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "25px" },
  leftChart: { flex: 1, minWidth: "300px", maxWidth: "600px" },
  rightChart: { flex: 1, minWidth: "300px", maxWidth: "600px" },
  achievementsSection: { marginBottom: "25px" },
  sectionTitle: { fontSize: "22px", marginBottom: "15px", fontWeight: 600 },
  loading: { fontSize: "24px", textAlign: "center", marginTop: "100px" }
};

export default Dashboard;