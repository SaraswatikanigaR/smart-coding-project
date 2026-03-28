import pool from "../config/db.js"
import { questionsData } from "../questionsData.js"


/* ---------- GET TOPIC UUID MAP ---------- */

async function getTopicMap() {

  const result = await pool.query(
    `SELECT topic_id, name FROM topics`
  )

  const map = {}

  result.rows.forEach(row => {
    map[row.name.toLowerCase()] = row.topic_id
  })

  return map
}



/* ---------- MAIN SEED FUNCTION ---------- */

async function seedQuestions() {

  console.log("Starting question seeding...\n")

  const topicMap = await getTopicMap()

  for (const q of questionsData) {

    try {

      const topicId = topicMap[q.topic.toLowerCase()]

      if (!topicId) {
        console.log("Skipping unknown topic:", q.topic)
        continue
      }


      /* ---------- INSERT QUESTION ---------- */

      const questionResult = await pool.query(
        `
        INSERT INTO questions
        (topic_id, question_type, title, description, difficulty, function_name)
        VALUES ($1,$2,$3,$4,$5,$6)
        ON CONFLICT (title) DO NOTHING
        RETURNING question_id
        `,
        [
          topicId,
          q.question_type,
          q.title,
          q.description,
          q.difficulty,
          q.function_name || null
        ]
      )


      if (questionResult.rows.length === 0) {

        console.log("Skipped duplicate:", q.title)
        continue

      }


      const questionId = questionResult.rows[0].question_id



      /* ---------- INSERT MCQ OPTIONS ---------- */

      if (q.question_type === "mcq" && q.options) {

        for (const opt of q.options) {

          await pool.query(
            `
            INSERT INTO mcq_options
            (question_id, option_text, is_correct)
            VALUES ($1,$2,$3)
            `,
            [
              questionId,
              opt.text,
              opt.correct
            ]
          )

        }

      }



      /* ---------- INSERT TEST CASES ---------- */

      if (q.question_type === "coding" && q.test_cases) {

        for (const tc of q.test_cases) {

          await pool.query(
            `
            INSERT INTO test_cases
            (question_id, input, expected_output)
            VALUES ($1,$2,$3)
            `,
            [
              questionId,
              JSON.stringify(tc.input),
              JSON.stringify(tc.expected_output)
            ]
          )

        }

      }


      console.log("Inserted:", q.title)

    }

    catch (err) {

      console.error("Error inserting", q.title, err.message)

    }

  }


  console.log("\nSeeding completed!")

  await pool.end()

}


seedQuestions()