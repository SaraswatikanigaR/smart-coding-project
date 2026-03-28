// import pool from "../config/db.js"

// export async function updatePerformance(userId, topicId, correct) {

//   const existing = await pool.query(
//     `
//     SELECT attempts, correct_answers
//     FROM user_performance
//     WHERE user_id = $1 AND topic_id = $2
//     `,
//     [userId, topicId]
//   )

//   if (existing.rows.length === 0) {

//     const attempts = 1
//     const correct_answers = correct ? 1 : 0
//     const accuracy = correct_answers / attempts

//     await pool.query(
//       `
//       INSERT INTO user_performance
//       (user_id, topic_id, attempts, correct_answers, accuracy)
//       VALUES ($1,$2,$3,$4,$5)
//       `,
//       [userId, topicId, attempts, correct_answers, accuracy]
//     )

//   }

//   else {

//     const attempts = existing.rows[0].attempts + 1
//     const correct_answers =
//       existing.rows[0].correct_answers + (correct ? 1 : 0)

//     const accuracy = correct_answers / attempts

//     await pool.query(
//       `
//       UPDATE user_performance
//       SET attempts=$1,
//           correct_answers=$2,
//           accuracy=$3,
//           last_updated=NOW()
//       WHERE user_id=$4 AND topic_id=$5
//       `,
//       [attempts, correct_answers, accuracy, userId, topicId]
//     )

//   }

// }

import pool from "../config/db.js";

export async function updatePerformance(userId, results) {
  for (const result of results) {
    const { topic_id, passed } = result;
    const isCorrect = passed ? 1 : 0;

    await pool.query(`
      INSERT INTO user_performance (user_id, topic_id, attempts, correct_answers, accuracy, last_updated)
      VALUES ($1, $2, 1, $3, $3, NOW())
      ON CONFLICT (user_id, topic_id) 
      DO UPDATE SET 
        attempts = user_performance.attempts + 1,
        correct_answers = user_performance.correct_answers + $3,
        accuracy = (CAST(user_performance.correct_answers + $3 AS FLOAT) / (user_performance.attempts + 1)),
        last_updated = NOW();
    `, [userId, topic_id, isCorrect]);
  }
}