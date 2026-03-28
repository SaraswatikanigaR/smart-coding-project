import fs from "fs"

import { arraysMCQ } from "../question-bank/arrays/arrays-mcq.js"
import { stringsMCQ } from "../question-bank/strings/strings-mcq.js"
import { hashmapsMCQ } from "../question-bank/hashmaps/hashmaps-mcq.js"

import { arraysCoding } from "../question-bank/arrays/arrays-coding.js"
import { stringsCoding } from "../question-bank/strings/strings-coding.js"


const questionsData = []


/* ---------- MCQ CONVERTER ---------- */

function convertMCQ(list) {

  list.forEach(q => {

    questionsData.push({

      topic: capitalize(q.topic),

      question_type: "mcq",

      title: q.question,

      description: q.question,

      difficulty: capitalize(q.difficulty),

      options: q.options.map(opt => ({
        text: opt,
        correct: opt === q.correct
      }))

    })

  })

}


/* ---------- CODING CONVERTER ---------- */

function convertCoding(list) {

  list.forEach(q => {

    questionsData.push({

      topic: capitalize(q.topic),

      question_type: "coding",

      title: q.title,

      description: q.description,

      difficulty: capitalize(q.difficulty),

      function_name: q.title
        .toLowerCase()
        .replace(/\s+/g,"_"),

      test_cases: q.test_cases.map(tc => ({
        input: [tc.input],
        expected_output: [tc.output]
      }))

    })

  })

}


/* ---------- HELPER ---------- */

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}


/* ---------- RUN CONVERSION ---------- */

convertMCQ(arraysMCQ)
convertMCQ(stringsMCQ)
convertMCQ(hashmapsMCQ)

convertCoding(arraysCoding)
convertCoding(stringsCoding)


/* ---------- WRITE FILE ---------- */

const output = `export const questionsData = ${JSON.stringify(questionsData,null,2)};`

fs.writeFileSync("./questionsData.js",output)

console.log("questionsData.js generated successfully!")
console.log(`Total questions: ${questionsData.length}`)