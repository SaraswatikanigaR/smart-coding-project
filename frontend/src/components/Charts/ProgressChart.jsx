import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { day: "Mon", solved: 4 },
  { day: "Tue", solved: 6 },
  { day: "Wed", solved: 5 },
  { day: "Thu", solved: 8 },
  { day: "Fri", solved: 10 },
  { day: "Sat", solved: 7 },
  { day: "Sun", solved: 9 },
];

function ProgressChart() {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Weekly Performance</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="solved" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  card: { background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginBottom: "20px" },
  title: { marginBottom: "10px" },
};

export default ProgressChart;