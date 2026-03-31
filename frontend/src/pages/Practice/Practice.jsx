// src/pages/Practice/Practice.jsx
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import mockData from "../../data/mockData";

function Practice() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [time, setTime] = useState(0);
  const [practiceActive, setPracticeActive] = useState(false);
  const [hotTime, setHotTime] = useState(0);
  const [hotActive, setHotActive] = useState(false);
  const [progress, setProgress] = useState(1); // 1% for now

  const hotQuestion = mockData.problems.find(p => p.isHot);

  const difficultyColor = diff => {
    if (diff === "Easy") return "#16a34a";
    if (diff === "Medium") return "#ca8a04";
    if (diff === "Hard") return "#dc2626";
  };

  const easyCount = 4;
  const mediumCount = 6;
  const hardCount = 4;

  const getBalancedProblems = () => {
    let filtered = mockData.problems.filter(p => !p.isHot);
    if (difficulty !== "All") filtered = filtered.filter(p => p.difficulty === difficulty);
    if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    const easy = filtered.filter(p => p.difficulty === "Easy").slice(0, easyCount);
    const medium = filtered.filter(p => p.difficulty === "Medium").slice(0, mediumCount);
    const hard = filtered.filter(p => p.difficulty === "Hard").slice(0, hardCount);

    return [...easy, ...medium, ...hard];
  };

  const balancedProblems = getBalancedProblems();

  useEffect(() => {
    if (!practiceActive) return;
    const interval = setInterval(() => {
      const startTime = parseInt(localStorage.getItem("practiceStart")) || Date.now();
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [practiceActive]);

  useEffect(() => {
    if (!hotActive) return;
    const interval = setInterval(() => {
      const hotStart = parseInt(localStorage.getItem("hotStart")) || Date.now();
      const elapsed = Math.floor((Date.now() - hotStart) / 1000);
      if (elapsed <= 20 * 60) setHotTime(elapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [hotActive]);

  const startPractice = () => {
    localStorage.setItem("practiceStart", Date.now());
    setPracticeActive(true);
  };

  const startHotTimer = () => {
    localStorage.setItem("hotStart", Date.now());
    setHotActive(true);
  };

  const handleSolve = (isHot = false) => {
    if (isHot) {
      setProgress(prev => Math.min(prev + 5, 100));
      setHotActive(false);
      localStorage.removeItem("hotStart");
      setHotTime(20 * 60);
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <Navbar />

        {/* Top Goal & Timer Row */}
        <div style={styles.topRow}>
          <div style={styles.goalSection}>
            <h2>🎯 Goal of the Day</h2>
            <p style={styles.goalText}>
              Challenge yourself! Solve 3 problems, conquer the Hot Question to supercharge your progress, and earn badges 🏆 as you level up your coding skills!
            </p>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
            <p style={{ marginTop: 5, fontSize: 14 }}>Daily Progress: {progress}%</p>
          </div>
          <div style={styles.timerSection}>
            <div style={styles.practiceTimer}>
              ⏱ Practice Timer: {Math.floor(time / 60)}m {time % 60}s
            </div>
            {!practiceActive && (
              <button style={{ ...styles.button, marginTop: 10 }} onClick={startPractice}>
                Start Practice
              </button>
            )}
          </div>
        </div>

        {/* Practice Problems Heading */}
        <h2 style={styles.sectionHeader}>Practice Problems</h2>

        {/* Search + Filter */}
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Search problems..."
            style={styles.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select style={styles.dropdown} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Hot Question */}
        {hotQuestion &&
          (difficulty === "All" || hotQuestion.difficulty === difficulty) &&
          (!search || hotQuestion.title.toLowerCase().includes(search.toLowerCase())) && (
            <div style={{ ...styles.card, ...styles.hotCard, width: "100%" }}>
              <h3>🔥 Hot Question: {hotQuestion.title}</h3>
              <p style={styles.description}>{hotQuestion.description}</p>
              <div style={{ marginTop: "auto" }}>
                <div style={styles.meta}>
                  <span>{hotQuestion.topic}</span>
                  <span style={{ ...styles.difficulty, color: difficultyColor(hotQuestion.difficulty) }}>
                    {hotQuestion.difficulty}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: 10 }}>
                  {!hotActive && (
                    <button style={{ ...styles.button, background: "#f59e0b" }} onClick={startHotTimer}>
                      Start Hot Timer
                    </button>
                  )}
                  <button
                    style={{ ...styles.button, background: "#ea580c" }}
                    onClick={() => handleSolve(true)}
                  >
                    Solve Hot Question and get 5% Rapid Bonus
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* Space after Hot Question */}
        <div style={{ height: 20 }} />

        {/* Remaining Problems */}
        <div style={styles.grid}>
          {balancedProblems.map(problem => (
            <div key={problem.id} style={styles.card}>
              <h3>{problem.title}</h3>
              <p style={styles.description}>{problem.description}</p>
              <div style={{ marginTop: "auto" }}>
                <div style={styles.meta}>
                  <span>{problem.topic}</span>
                  <span style={{ ...styles.difficulty, color: difficultyColor(problem.difficulty) }}>
                    {problem.difficulty}
                  </span>
                </div>
                <button style={{ ...styles.button, marginTop: 5 }} onClick={() => handleSolve(false)}>
                  Start Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", background: "#f5f7fb" },
  main: { flex: 1, padding: "25px", overflowY: "auto" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 25, flexWrap: "wrap" },
  goalSection: { flex: 1, minWidth: 300 },
  goalText: { fontSize: 14, color: "#374151", marginBottom: 10 },
  progressBar: { background: "#e5e7eb", borderRadius: "10px", height: "15px", overflow: "hidden", marginBottom: 5 },
  progressFill: { height: "100%", background: "#34d399", transition: "width 0.5s ease-in-out" },
  timerSection: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  practiceTimer: { fontWeight: "bold", fontSize: 16 },
  filters: { display: "flex", gap: "15px", marginBottom: 20, flexWrap: "wrap" },
  search: { padding: "8px", borderRadius: "6px", border: "1px solid #ddd", width: "220px" },
  dropdown: { padding: "8px", borderRadius: "6px", border: "1px solid #ddd" },
  sectionHeader: { fontSize: "20px", fontWeight: 600, marginBottom: 15 },
  grid: { display: "flex", flexWrap: "wrap", gap: "15px" },
  card: { background: "white", padding: "15px", borderRadius: "10px", width: "230px", display: "flex", flexDirection: "column", minHeight: 180, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" },
  hotCard: { border: "2px solid #f59e0b", animation: "pulse 1.5s infinite", padding: 20 },
  description: { fontSize: "14px", color: "#6b7280", marginBottom: 10 },
  meta: { display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 500 },
  difficulty: { fontWeight: "bold" },
  button: { padding: "6px", border: "none", borderRadius: "6px", background: "#2563eb", color: "white", cursor: "pointer", fontSize: 13 },
};

export default Practice;