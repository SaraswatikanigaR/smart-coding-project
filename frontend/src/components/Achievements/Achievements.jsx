function Achievements({ horizontal = true, gamified = true }) {
  const achievements = [
    { icon: "🏆", title: "First 50 Problems", desc: "Solved your first 50 coding problems" },
    { icon: "🔥", title: "7 Day Streak", desc: "Practiced coding for 7 days in a row" },
    { icon: "⚡", title: "Fast Solver", desc: "Solved a problem in under 5 minutes" },
    { icon: "🧠", title: "Array Master", desc: "Solved 20 array problems" },
  ];

  return (
    <div style={{
      display: "flex",
      flexDirection: horizontal ? "row" : "column",
      gap: "20px",
      flexWrap: "wrap"
    }}>
      {achievements.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            width: "180px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            opacity: gamified ? (idx % 2 === 0 ? 1 : 0.6) : 1, // gamified shading
            transition: "0.3s",
            cursor: "pointer",
            transform: "translateY(0)",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{ fontSize: "26px", marginBottom: "8px" }}>{item.icon}</div>
          <h4 style={{ margin: "0 0 5px 0", fontSize: "16px", fontWeight: 600 }}>{item.title}</h4>
          <p style={{ fontSize: "14px", color: "#4b5563", margin: 0 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Achievements;