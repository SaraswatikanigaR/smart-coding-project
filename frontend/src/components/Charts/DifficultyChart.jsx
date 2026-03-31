import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Easy", value: 40 },
  { name: "Medium", value: 35 },
  { name: "Hard", value: 15 }
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function DifficultyChart() {
  return (
    <div style={styles.card}>
      <h3>Problem Difficulty Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80} label>
            {data.map((entry, index) => <Cell key={index} fill={COLORS[index]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = { card: { background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" } };

export default DifficultyChart;