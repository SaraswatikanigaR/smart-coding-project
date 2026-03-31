import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { topic: "Arrays", score: 80 },
  { topic: "Strings", score: 70 },
  { topic: "Hash Maps", score: 55 },
  { topic: "Recursion", score: 40 },
  { topic: "Dynamic Prog", score: 20 },
  { topic: "Trees", score: 50 }
];

function TopicStrengthChart() {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Topic Strength</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="topic" interval={0} />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" fill="#6366f1" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  card: { background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  title: { marginBottom: "15px" },
};

export default TopicStrengthChart;