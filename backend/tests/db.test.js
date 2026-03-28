// server/tests/db.test.js
import pool from '../config/db.js'; // ✅ Modern style // Adjust this path to your db connection file

describe('Database Connection Health Check', () => {
  // Close the pool after tests so the process exits
  afterAll(async () => {
    await pool.end();
  });

  it('should successfully connect and query the database', async () => {
    try {
      // We ask the DB to calculate 1+1 to prove it's "thinking"
      const res = await pool.query('SELECT 1 + 1 AS result');
      expect(res.rows[0].result).toBe(2);
    } catch (err) {
      throw new Error(`DB Connection Failed: ${err.message}`);
    }
  });

  it('should verify the questions table exists', async () => {
    const res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'questions'
      );
    `);
    expect(res.rows[0].exists).toBe(true);
  });
});