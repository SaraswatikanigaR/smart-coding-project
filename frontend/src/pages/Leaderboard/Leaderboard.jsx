import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Leaderboard.module.css";

// Mock leaderboard data
const mockLeaderboard = [
  { name: "Rahul", streak: 10, xp: 1450, problemsSolved: 45, level: 5, badge: "🥇" },
  { name: "Kaniga", streak: 6, xp: 1000, problemsSolved: 12, level: 2, badge: "🥈" }, // XP updated to 1000
  { name: "Sneha", streak: 8, xp: 900, problemsSolved: 30, level: 3, badge: "🏅" },
  { name: "Meena", streak: 5, xp: 380, problemsSolved: 10, level: 2, badge: "🥉" },
  { name: "Divya", streak: 4, xp: 300, problemsSolved: 9, level: 2, badge: "⚡" },
  { name: "Ankit", streak: 3, xp: 250, problemsSolved: 8, level: 1, badge: "⚡" },
  { name: "Riya", streak: 2, xp: 180, problemsSolved: 6, level: 1, badge: "🔒" },
  { name: "Amit", streak: 1, xp: 90, problemsSolved: 2, level: 1, badge: "🔒" },
];

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const currentUserName = "Kaniga";

  useEffect(() => {
    setTimeout(() => {
      // Sort descending by XP
      setLeaderboard(
        mockLeaderboard.sort((a, b) => b.xp - a.xp)
      );
    }, 300);
  }, []);

  const getUserMessage = (user, rank) => {
    if (user.name !== currentUserName) return ""; // only personalize for current user
    if (rank === 1) return "🎉 Wow! You're leading! 👏 Keep it up!";
    if (rank === 2) return "🏆 Great job! You're 2nd! Keep climbing!";
    if (rank <= 3) return "🏆 Awesome! Keep improving!";
    return "💪 Focus on the next challenge! You can do it!";
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Navbar />

        <h2 className={styles.pageTitle}>Leaderboard 🏆</h2>
        <p className={styles.subTitle}>
          Track top performers, earn badges, and level up your coding journey!
        </p>

        <div className={styles.table}>
          {leaderboard.map((user, idx) => {
            const isCurrentUser = user.name === currentUserName;
            const userMessage = getUserMessage(user, idx + 1);

            return (
              <div
                key={idx}
                className={`${styles.row} ${isCurrentUser ? styles.currentUser : ""}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={styles.rank}>{idx + 1}</div>
                <div className={styles.name}>
                  <span className={styles.badge}>{user.badge}</span> {user.name}
                </div>
                <div className={styles.streak}>🔥 {user.streak}</div>
                <div className={styles.problems}>{user.problemsSolved} solved</div>
                <div className={styles.xpContainer}>
                  <span className={styles.level}>Lvl {user.level}</span>
                  <div className={styles.xpBar}>
                    <div
                      className={styles.xpFill}
                      style={{ width: `${(user.xp / 1500) * 100}%` }}
                    />
                  </div>
                  <span className={styles.xp}>{user.xp} XP</span>
                </div>
                {isCurrentUser && userMessage && (
                  <div className={styles.message}>{userMessage}</div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}