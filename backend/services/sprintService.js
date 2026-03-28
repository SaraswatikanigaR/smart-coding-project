// const pool = require("../config/db");

// async function getUserTopicScores(userId) {

//   const result = await pool.query(`
//     SELECT
//       q.topic_id,
//       COUNT(*) AS attempts,
//       SUM(CASE WHEN ua.passed THEN 1 ELSE 0 END) AS correct
//     FROM user_attempts ua
//     JOIN questions q ON q.id = ua.question_id
//     WHERE ua.user_id = $1
//     GROUP BY q.topic_id
//   `, [userId]);

//   return result.rows.map(row => ({
//     topic_id: row.topic_id,
//     attempts: parseInt(row.attempts),
//     correct: parseInt(row.correct),
//     score: row.correct / row.attempts
//   }));

// }

// module.exports = { getUserTopicScores };

// import pool from "../config/db.js"; // Updated to import + added .js

// export async function getUserTopicScores(userId) { // Added 'export' keyword

//   const result = await pool.query(`
//     SELECT 
//       q.topic_id, 
//       COUNT(*) AS attempts, 
//       SUM(CASE WHEN ua.passed THEN 1 ELSE 0 END) AS correct
//     FROM user_attempts ua
//     JOIN questions q ON q.id = ua.question_id
//     WHERE ua.user_id = $1
//     GROUP BY q.topic_id
//   `, [userId]);

//   return result.rows.map(row => ({
//     topic_id: row.topic_id,
//     attempts: parseInt(row.attempts),
//     correct: parseInt(row.correct),
//     score: row.correct / row.attempts
//   }));

// }

// // Removed: module.exports = { getUserTopicScores };

// const pool = require("../config/db");
// const { getUserTopicScores } = require("./recommendationService");

// async function getSprintQuestions(userId) {

//   const topics = await getUserTopicScores(userId);

//   if (topics.length === 0) {

//     const fallback = await pool.query(`
//       SELECT *
//       FROM questions
//       ORDER BY RANDOM()
//       LIMIT 10
//     `);

//     return fallback.rows;

//   }

//   const strongTopics = topics
//     .filter(t => t.score >= 0.7)
//     .map(t => t.topic_id);

//   const mediumTopics = topics
//     .filter(t => t.score >= 0.4 && t.score < 0.7)
//     .map(t => t.topic_id);

//   const strongQuestions = await pool.query(`
//     SELECT *
//     FROM questions
//     WHERE topic_id = ANY($1)
//     ORDER BY RANDOM()
//     LIMIT 6
//   `, [strongTopics]);

//   const mediumQuestions = await pool.query(`
//     SELECT *
//     FROM questions
//     WHERE topic_id = ANY($1)
//     ORDER BY RANDOM()
//     LIMIT 4
//   `, [mediumTopics]);

//   return [...strongQuestions.rows, ...mediumQuestions.rows];

// }

// module.exports = { getSprintQuestions };

import pool from "../config/db.js";
import { getUserTopicScores } from "./recommendationService.js";

export async function getSprintQuestions(userId) {
  const topics = await getUserTopicScores(userId);

  if (topics.length === 0) {
    const fallback = await pool.query(`
      SELECT * FROM questions 
  WHERE type = 'mcq' 
  ORDER BY RANDOM() 
  LIMIT 10
    `);

    return fallback.rows;
  }

  const strongTopics = topics
    .filter(t => t.score >= 0.7)
    .map(t => t.topic_id);

  const mediumTopics = topics
    .filter(t => t.score >= 0.4 && t.score < 0.7)
    .map(t => t.topic_id);

  // Note: If strongTopics or mediumTopics are empty arrays, 
  // the ANY($1) query might return 0 results. 
  const strongQuestions = await pool.query(`
    SELECT *
  FROM questions
  WHERE topic_id = ANY($1)
  AND question_type = 'mcq'
  ORDER BY RANDOM()
  LIMIT 6
  `, [strongTopics.length > 0 ? strongTopics : [null]]);

  const mediumQuestions = await pool.query(`
    SELECT *
  FROM questions
  WHERE topic_id = ANY($1)
  AND question_type = 'mcq'
  ORDER BY RANDOM()
  LIMIT 4
  `, [mediumTopics.length > 0 ? mediumTopics : [null]]);

  return [...strongQuestions.rows, ...mediumQuestions.rows];
}