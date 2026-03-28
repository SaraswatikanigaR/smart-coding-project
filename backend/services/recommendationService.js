import pool from "../config/db.js";

export async function getUserTopicScores(userId) {
  // Querying the pre-calculated performance table is much more efficient
  const result = await pool.query(`
    SELECT 
      topic_id, 
      accuracy AS score 
    FROM user_performance 
    WHERE user_id = $1
  `, [userId]);

  return result.rows; 
  // returns: [{ topic_id: "...", score: 0.9 }, { topic_id: "...", score: 0.2 }]
}
