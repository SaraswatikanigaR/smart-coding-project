import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pool from "./config/db.js";

// Cleanly imported at the top
import { getSprintQuestions } from "./services/sprintService.js";
import { getRevisionQuestions } from "./services/revisionService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({ message: "LearnFlow Backend Running 🚀" });
});

// ===============================
// GET ALL QUESTIONS
// ===============================

app.get("/questions", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT q.topic_id, q.title, q.description, q.difficulty, t.name AS topic
      FROM questions q
      JOIN topics t ON q.topic_id = t.topic_id
      ORDER BY q.difficulty
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// ===============================
// GET SINGLE QUESTION
// ===============================

app.get("/questions/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT q.*, t.name AS topic
      FROM questions q
      JOIN topics t ON q.topic_id = t.topic_id
      WHERE q.id = $1
    `, [id]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch question" });
  }
});

// ===============================
// SPRINT MODE
// ===============================

app.get("/modes/sprint/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const questions = await getSprintQuestions(userId);

    res.json({
      mode: "sprint",
      timeLimit: 600,
      questions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sprint mode failed" });
  }
});

// ===============================
// REVISION MODE
// ===============================

app.get("/modes/revision/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const questions = await getRevisionQuestions(userId);

    res.json({
      mode: "revision",
      questions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Revision mode failed" });
  }
});

// ===============================
// CODING CHALLENGE
// ===============================

app.get("/modes/challenge", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM questions
      WHERE difficulty = 'Hard' AND
            question_type = 'coding'
      ORDER BY RANDOM()
      LIMIT 1
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Challenge mode failed" });
  }
});

// ===============================
// SUBMIT QUIZ RESULTS
// ===============================
import { updatePerformance } from "./services/performanceService.js";

app.post("/questions/submit", async (req, res) => {
  const { userId, results } = req.body; 
  // results example: [{ topic_id: '...', passed: true }, { topic_id: '...', passed: false }]

  try {
    await updatePerformance(userId, results);
    res.json({ message: "Performance updated successfully! 📈" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update performance" });
  }
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});