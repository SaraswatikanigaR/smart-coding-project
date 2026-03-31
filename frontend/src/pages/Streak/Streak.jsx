import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

// MOCK DATA
const streakData = {
  currentStreak: 6,
  longestStreak: 14,
  weeklyTimeline: [
    { week: "Week 1", solved: 10, errors: 2, partial: 3, completion: 70 },
    { week: "Week 2", solved: 12, errors: 1, partial: 2, completion: 75 },
    { week: "Week 3", solved: 8, errors: 3, partial: 2, completion: 65, ongoing: true }, // Current week
  ],
  milestones: [ 
    { day: 3, title: "Bronze Badge", icon: "🥉", xp: 20, color: "#f59e0b" },
    { day: 7, title: "Medium Challenge", icon: "🏆", xp: 40, color: "#60a5fa" },
    { day: 14, title: "Silver Badge + XP Boost", icon: "🥈", xp: 60, color: "#9ca3af" },
    { day: 21, title: "Gold Badge + Special Reward", icon: "🥇", xp: 100, color: "#facc15" },
  ],
  challengeHistory: [
    { day: "Mon", solved: 2 },
    { day: "Tue", solved: 0 },
    { day: "Wed", solved: 3 },
    { day: "Thu", solved: 1 },
    { day: "Fri", solved: 2 },
    { day: "Sat", solved: 0 },
    { day: "Sun", solved: 4 },
  ],
  motivationCards: [
    "You coded 4 days in a row! Keep going to hit 7!",
    "Your Recursion streak is strong, but Arrays need more love.",
    "Consistency is key — 3 weeks of streaks already!",
  ],
  topLeaders: [
    { name: "Rahul", streak: 10 },
    { name: "You", streak: 6 },
    { name: "Meena", streak: 5 },
  ],
  upcomingGoals: [
    { title: "Solve 1 problem in Arrays today", progress: 20 },
    { title: "Attempt the Hot Question tomorrow", progress: 0 },
    { title: "Maintain your streak to unlock next milestone", progress: 0 },
    { title: "Solve 2 problems in Recursion", progress: 50 },
    { title: "Attempt 1 Medium problem", progress: 0 },
    { title: "Review last week's mistakes", progress: 10 },
  ],
  quickTips: [
    "Solve a Medium problem before 8 PM to maintain your streak!",
    "Even 1 easy problem counts — keep the streak alive!",
    "Try solving errors first to improve your streak.",
  ],
};

export default function Streak() {
  const [weeklyTimeline] = useState(streakData.weeklyTimeline);

  // Progression bars always green
  const getBarColor = () => "#34d399";

  const fireCount = (streak) => Math.min(streak, 10);

  const statusColors = {
    solved: "#34d399",
    partial: "#fbbf24",
    errors: "#f87171",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "25px", overflowY: "auto" }}>
        <Navbar />

        {/* Current Streak / Longest / Level */}
        <section style={{ marginBottom: "30px", display: "flex", gap: "25px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px", background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 5px 20px rgba(0,0,0,0.08)" }}>
            <p style={{ margin: 0, fontWeight: 500 }}>Current Streak</p>
            <h2 style={{ margin: "8px 0 0 0" }}>{streakData.currentStreak} Days 🔥</h2>
          </div>
          <div style={{ flex: "1 1 200px", background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 5px 20px rgba(0,0,0,0.08)" }}>
            <p style={{ margin: 0, fontWeight: 500 }}>Longest Streak</p>
            <h2 style={{ margin: "8px 0 0 0" }}>{streakData.longestStreak} Days</h2>
          </div>
          <div style={{ flex: "1 1 200px", background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 5px 20px rgba(0,0,0,0.08)" }}>
            <p style={{ margin: 0, fontWeight: 500 }}>Level / XP</p>
            <h2 style={{ margin: "8px 0 0 0" }}>Level 5 | 420 / 500 XP</h2>
          </div>
        </section>

        {/* Weekly Timeline */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Streak Timeline (Weekly)</h3>
          <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
            {weeklyTimeline.map((week, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: "220px",
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {week.ongoing && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "#2563eb",
                      color: "#fff",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Current Week
                  </span>
                )}
                <h3 style={{ margin: "0 0 10px 0", fontWeight: 700 }}>{week.week}</h3>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: statusColors.solved }}></div>
                    <span>{week.solved} Solved</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: statusColors.partial }}></div>
                    <span>{week.partial} Partial</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: statusColors.errors }}></div>
                    <span>{week.errors} Errors</span>
                  </div>
                </div>
                <div style={{ background: "#e5e7eb", borderRadius: "10px", height: "10px", overflow: "hidden" }}>
                  <div style={{ width: `${week.completion}%`, height: "100%", background: getBarColor(), transition: "width 0.4s" }} />
                </div>
                <p style={{ marginTop: "5px", fontSize: "12px", color: "#6b7280" }}>Progression Rate: {week.completion}%</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones / Reward Ladder */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Milestones & Rewards</h3>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {streakData.milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  flex: "1 1 220px",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: m.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {m.icon}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>🔥 {m.day}-Day Streak</p>
                  <p style={{ margin: 0 }}>Reward: {m.title} (+{m.xp} XP)</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge History */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Challenge History & Trends</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {streakData.challengeHistory.map((h, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: "45px",
                  borderRadius: "12px",
                  background: h.solved > 0 ? "#34d399" : "#e5e7eb",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: h.solved > 0 ? "#fff" : "#9ca3af",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                title={h.solved > 0 ? `${h.solved} problem(s) solved` : "No problems solved. Try 15 mins today!"}
              >
                {h.day.slice(0, 3)}
              </div>
            ))}
          </div>
        </section>

        {/* Motivation Boost */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Motivation Boost 💡</h3>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {streakData.motivationCards.map((c, idx) => (
              <div
                key={idx}
                style={{
                  flex: "1 1 300px",
                  background: "#fef3c7",
                  padding: "15px",
                  borderRadius: "15px",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </section>

        {/* Top Streak Leaders */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Top Streak Leaders</h3>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {streakData.topLeaders.map((l, idx) => (
              <div
                key={idx}
                style={{
                  flex: "1 1 180px",
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
              >
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: "#60a5fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {l.name[0]}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>{l.name}</p>
                  <p style={{ margin: 0 }}>{l.streak} Days {"🔥".repeat(fireCount(l.streak))}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Streak Goals */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Upcoming Streak Goals</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "15px" }}>
            {streakData.upcomingGoals.map((g, idx) => (
              <div key={idx} style={{ background: "#fff", padding: "15px", borderRadius: "15px", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", transition: "transform 0.2s", cursor: "pointer" }}>
                <p style={{ margin: 0, fontWeight: 500 }}>{g.title}</p>
                <div style={{ background: "#e5e7eb", borderRadius: "10px", height: "8px", marginTop: "8px", overflow: "hidden" }}>
                  <div style={{ width: `${g.progress}%`, height: "100%", background: "#34d399", transition: "width 0.4s" }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Quick Tips</h3>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {streakData.quickTips.map((tip, idx) => (
              <div key={idx} style={{ flex: "1 1 300px", background: "#fef3c7", padding: "15px", borderRadius: "15px", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", fontWeight: 500, cursor: "pointer" }}>
                💡 {tip}
              </div>
            ))}
          </div>
        </section>

        {/* Reflection */}
        <section style={{ marginBottom: "50px" }}>
          <h3 style={{ marginBottom: "15px" }}>Reflection</h3>
          <textarea
            placeholder="Which topic did you enjoy most this week? Which topic needs more attention?"
            style={{ width: "100%", padding: "15px", borderRadius: "15px", border: "1px solid #d1d5db", resize: "vertical", minHeight: "100px", fontSize: "15px" }}
          />
          <button style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "10px", background: "#2563eb", color: "#fff", fontWeight: "bold", cursor: "pointer", border: "none" }}>
            Save Reflection
          </button>
        </section>
      </main>
    </div>
  );
}