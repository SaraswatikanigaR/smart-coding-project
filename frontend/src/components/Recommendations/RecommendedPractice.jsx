function RecommendedPractice() {
  const recommendations = [
    { topic: "Arrays", problems: 3, difficulty: "Easy" },
    { topic: "Recursion", problems: 2, difficulty: "Medium" },
    { topic: "Hash Maps", problems: 2, difficulty: "Medium" },
    { topic: "Trees", problems: 2, difficulty: "Medium" },
    { topic: "Strings", problems: 3, difficulty: "Easy" },
    { topic: "Graphs", problems: 2, difficulty: "Hard" }
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Suggested Practice</h3>
      <div style={styles.cards}>
        {recommendations.map((item, index) => (
          <div key={index} style={styles.card}>
            <h4>{item.topic}</h4>
            <p>{item.problems} problems</p>
            <p style={styles.diff}>{item.difficulty}</p>
            <button style={styles.button}>Start Practice</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { marginTop: "25px" },
  title: { marginBottom: "15px" },
  cards: { display: "flex", flexWrap: "wrap", gap: "15px" },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "180px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.2s",
    cursor: "pointer"
  },
  diff: { color: "#6b7280", fontSize: "14px" },
  button: { marginTop: "10px", padding: "8px", border: "none", borderRadius: "8px", background: "#6366f1", color: "white", cursor: "pointer" },
};

export default RecommendedPractice;