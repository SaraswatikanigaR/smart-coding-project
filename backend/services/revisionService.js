// const pool = require("../config/db");
// const { getUserTopicScores } = require("./recommendationService");

// async function getRevisionQuestions(userId) {

//   const topics = await getUserTopicScores(userId);

//   const weakTopics = topics
//     .filter(t => t.score < 0.4)
//     .map(t => t.topic_id);

//   if (weakTopics.length === 0) {

//     const fallback = await pool.query(`
//       SELECT *
//       FROM questions
//       ORDER BY RANDOM()
//       LIMIT 7
//     `);

//     return fallback.rows;

//   }

//   const questions = await pool.query(`
//     SELECT *
//     FROM questions
//     WHERE topic_id = ANY($1)
//     ORDER BY RANDOM()
//     LIMIT 8
//   `, [weakTopics]);

//   return questions.rows;

// }

// module.exports = { getRevisionQuestions };

// import pool from "../config/db.js"; // Added .js extension
// import { getUserTopicScores } from "./recommendationService.js"; // Added .js extension

// export async function getRevisionQuestions(userId) {
//   const topics = await getUserTopicScores(userId);

//   const weakTopics = topics
//     .filter(t => t.score < 0.4)
//     .map(t => t.topic_id);

//   if (weakTopics.length === 0) {
//     const fallback = await pool.query(`
//      SELECT *
//   FROM questions
//   WHERE type = 'mcq'  -- Filter for MCQ only
//   ORDER BY RANDOM()
//   LIMIT 7
//     `);

//     return fallback.rows;
//   }

//   const questions = await pool.query(`
//    SELECT *
//   FROM questions
//   WHERE topic_id = ANY($1)
//   AND question_type = 'mcq'    -- Filter for MCQ only
//   ORDER BY RANDOM()
//   LIMIT 8
//   `, [weakTopics]);

//   return questions.rows;
// }

//first backend change
import pool from "../config/db.js";
import { getUserTopicScores } from "./recommendationService.js";

export async function getRevisionQuestions(userId) {
  const topics = await getUserTopicScores(userId);

  // 1. Identify weak spots (accuracy < 40%)
  const weakTopics = topics
    .filter(t => t.score < 0.4)
    .map(t => t.topic_id);

  // 2. Define a reusable SQL fragment to fetch questions with their nested options
  // This ensures the frontend 'options' array isn't undefined
  const fetchWithButtonsSql = `
    SELECT 
      q.question_id, 
      q.topic_id, 
      q.question_type, 
      q.title, 
      q.description, 
      q.difficulty,
      json_agg(
        json_build_object(
          'text', mo.option_text, 
          'is_correct', mo.is_correct
        )
      ) AS options
    FROM questions q
    LEFT JOIN mcq_options mo ON q.question_id = mo.question_id
    WHERE q.question_type = 'mcq'
  `;

  // 3. Logic for Fallback vs. Weak Topics
  if (weakTopics.length === 0) {
    const fallback = await pool.query(`
      ${fetchWithButtonsSql}
      GROUP BY q.question_id
      ORDER BY RANDOM()
      LIMIT 7
    `);
    return fallback.rows;
  }

  const questions = await pool.query(`
    ${fetchWithButtonsSql}
    AND q.topic_id = ANY($1)
    GROUP BY q.question_id
    ORDER BY RANDOM()
    LIMIT 8
  `, [weakTopics]);

  return questions.rows;
}