import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import styles from "./TopicsPage.module.css";

// MOCK DATA
const topicsData = [
  { name: "Arrays", progress: 80, strength: "Strong", recommendedProblems: [{difficulty:"Easy", count:3},{difficulty:"Medium",count:2}], masteryBadge:"🥉" },
  { name: "Strings", progress: 70, strength: "Moderate", recommendedProblems:[{difficulty:"Easy",count:2},{difficulty:"Medium",count:3}], masteryBadge:"🥈" },
  { name: "Hash Maps", progress: 55, strength: "Moderate", recommendedProblems:[{difficulty:"Medium",count:2},{difficulty:"Hard",count:1}], masteryBadge:"⚡" },
  { name: "Recursion", progress: 40, strength: "Weak", recommendedProblems:[{difficulty:"Medium",count:2},{difficulty:"Hard",count:1}], masteryBadge:"🔥" },
  { name: "Dynamic Programming", progress: 20, strength: "Weak", recommendedProblems:[{difficulty:"Hard",count:2}], masteryBadge:"💀" },
];

const quickTipsData = [
  "Focus on topics with less than 50% progress today.",
  "Try solving at least one Medium problem in weak topics.",
  "Consistency over intensity — practice daily for best recall!",
];

// --- TopicCard component ---
const TopicCard = ({ topic }) => {
  const getProgressColor = (progress) => {
    if (progress >= 70) return "#34d399";
    if (progress >= 50) return "#fbbf24";
    return "#f87171";
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>{topic.masteryBadge}</span>
        <h3>{topic.name}</h3>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${topic.progress}%`, background: getProgressColor(topic.progress) }}
        />
      </div>
      <p className={styles.progressText}>{topic.progress}% completed</p>
      <p className={styles.strengthText}>Strength: {topic.strength}</p>
      <div className={styles.recommended}>
        {topic.recommendedProblems.map((p, idx) => (
          <span key={idx} className={styles.recommendation}>{p.count} {p.difficulty}</span>
        ))}
      </div>
      <button className={styles.practiceBtn}>Start Practice</button>
    </div>
  );
};

// --- WeakTopicCard component ---
const WeakTopicCard = ({ topic }) => (
  <div className={styles.weakCard}>
    <h4>{topic.name}</h4>
    <p>Progress: {topic.progress}%</p>
    <p>Strength: {topic.strength}</p>
    <button className={styles.weakBtn}>Focus Practice</button>
  </div>
);

// --- QuickTips component ---
const QuickTips = ({ tips }) => (
  <div className={styles.tipsContainer}>
    <h3>Quick Tips 💡</h3>
    <ul>
      {tips.map((tip, idx) => <li key={idx}>💡 {tip}</li>)}
    </ul>
  </div>
);

export default function TopicsPage() {
  const [topics] = useState(topicsData);
  const weakTopics = topics.filter(t => t.progress < 50);

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Navbar />
        <h2 className={styles.pageTitle}>Your Topics & Progress</h2>

        <section className={styles.gridSection}>
          {topics.map((topic, idx) => <TopicCard key={idx} topic={topic} />)}
        </section>

        {weakTopics.length > 0 && (
          <section className={styles.weakSection}>
            <h3>Weak Topics — Focus Here ⚠️</h3>
            <div className={styles.gridSection}>
              {weakTopics.map((topic, idx) => <WeakTopicCard key={idx} topic={topic} />)}
            </div>
          </section>
        )}

        <section className={styles.quickTipsSection}>
          <QuickTips tips={quickTipsData} />
        </section>
      </main>
    </div>
  );
}