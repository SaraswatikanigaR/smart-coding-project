import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./AchievementsPage.module.css";

export default function Achievements() {
  // Mock Data
  const statsData = [
    { title: "Badges Earned", value: 12, icon: "🏆", color: "#fbbf24" },
    { title: "Challenges Completed", value: 27, icon: "🔥", color: "#f87171" },
    { title: "Topics Mastered", value: 8, icon: "🧠", color: "#34d399" },
    { title: "Speed Achievements", value: 5, icon: "⚡", color: "#60a5fa" },
  ];

  const achievementsData = [
    {
      title: "First 50 Problems",
      description: "Solved your first 50 coding problems",
      icon: "🏆",
      date: "2026-03-02",
      type: "earned",
    },
    {
      title: "Array Explorer",
      description: "Completed 20 array problems",
      icon: "🧠",
      date: "2026-03-05",
      type: "earned",
    },
    {
      title: "Fast Solver",
      description: "Solved a problem under 5 minutes",
      icon: "⚡",
      date: "2026-03-04",
      type: "earned",
    },
    {
      title: "Dynamic Pro",
      description: "Mastered 3 dynamic programming challenges",
      icon: "💥",
      type: "locked",
    },
    {
      title: "Graph Guru",
      description: "Complete 5 graph problems",
      icon: "📈",
      type: "locked",
    },
  ];

  // Sub-component: StatCard
  const StatCard = ({ stat }) => (
    <div className={styles.statCard} style={{ borderTopColor: stat.color }}>
      <div className={styles.statIcon}>{stat.icon}</div>
      <h3 className={styles.statValue}>{stat.value}</h3>
      <p className={styles.statTitle}>{stat.title}</p>
    </div>
  );

  // Sub-component: AchievementCard
  const AchievementCard = ({ achievement }) => {
    const isLocked = achievement.type === "locked";
    return (
      <div
        className={`${styles.achievementCard} ${
          isLocked ? styles.locked : styles.unlocked
        }`}
      >
        <div className={styles.achievementIcon}>{achievement.icon}</div>
        <h3 className={styles.achievementTitle}>{achievement.title}</h3>
        <p className={styles.achievementDescription}>
          {achievement.description}
        </p>
        {achievement.date && (
          <p className={styles.achievementDate}>Earned: {achievement.date}</p>
        )}
        {isLocked && <span className={styles.lockText}>🔒 Locked</span>}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Navbar />
        <h2 className={styles.pageTitle}>Your Achievements & Milestones</h2>

        {/* Stats Grid */}
        <section className={styles.statsGrid}>
          {statsData.map((s, idx) => (
            <StatCard key={idx} stat={s} />
          ))}
        </section>

        {/* Achievement Cards */}
        <section className={styles.achievementsGrid}>
          {achievementsData.map((ach, idx) => (
            <AchievementCard key={idx} achievement={ach} />
          ))}
        </section>
      </main>
    </div>
  );
}