import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import { db } from "./db";
import { problems } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.problems.list.path, async (req, res) => {
    try {
      const allProblems = await storage.getProblems();
      res.json(allProblems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch problems" });
    }
  });

  app.get(api.problems.get.path, async (req, res) => {
    try {
      const problem = await storage.getProblem(Number(req.params.id));
      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }
      res.json(problem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch problem" });
    }
  });

  app.post(api.evaluate.submit.path, async (req, res) => {
    try {
      const { code, problemId } = api.evaluate.submit.input.parse(req.body);
      const problem = await storage.getProblem(problemId);
      
      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }

      // Basic dummy evaluation for runtime and memory 
      const runtime = Math.floor(Math.random() * 50) + 10;
      const memory = (Math.random() * 10 + 5).toFixed(1);
      
      // Static analysis dummy metrics
      const lines = code.split("\n").length;
      const complexity = Math.floor(Math.random() * 3) + 1;
      const loopDepth = (code.match(/for|while/g) || []).length;
      const functions = (code.match(/function|=>/g) || []).length;

      // Ask AI to evaluate the code
      const prompt = `
        You are an expert coding instructor evaluating a student's code submission.
        
        Problem: ${problem.title}
        Description: ${problem.description}
        
        Student's Code:
        ${code}
        
        Please evaluate this code and respond ONLY with a valid JSON object (no markdown) with these exact fields:
        {
          "passed": <number 0-${problem.testCases.length}>,
          "qualityScore": <number 1-5>,
          "efficiency": "<string like 'Optimal', 'Inefficient', or 'Average'>",
          "issue": "<string describing main issue or 'None'>",
          "aiExplanation": "<string explaining what is wrong or right>",
          "suggestedApproach": ["<step 1>", "<step 2>", ...],
          "thinkAboutThis": "<one conceptual question>"
        }
      `;

      let aiResult;
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          max_completion_tokens: 2000,
        });

        aiResult = JSON.parse(response.choices[0]?.message?.content || "{}");
      } catch (error) {
        console.log("AI evaluation failed, using fallback:", error.message);
        // Fallback dummy evaluation
        aiResult = {
          passed: Math.floor(Math.random() * (problem.testCases.length + 1)),
          qualityScore: Math.floor(Math.random() * 5) + 1,
          efficiency: ["Optimal", "Inefficient", "Average"][Math.floor(Math.random() * 3)],
          issue: "AI evaluation unavailable - check API quota",
          aiExplanation: "Unable to generate AI feedback due to API quota limits. Please add credits to your OpenAI account for full AI-powered analysis.",
          suggestedApproach: ["Review the problem requirements", "Check edge cases", "Optimize your algorithm"],
          thinkAboutThis: "What are the time and space complexity constraints?"
        };
      }

      res.json({
        passed: aiResult.passed ?? 0,
        total: problem.testCases.length,
        runtime,
        memory: Number(memory),
        qualityScore: aiResult.qualityScore ?? 1,
        efficiency: aiResult.efficiency ?? "Unknown",
        issue: aiResult.issue ?? "Unverified",
        complexity,
        loopDepth,
        lines,
        functions,
        aiExplanation: aiResult.aiExplanation ?? "No explanation provided.",
        suggestedApproach: aiResult.suggestedApproach ?? ["Keep practicing.", "Review the problem constraints."],
        thinkAboutThis: aiResult.thinkAboutThis ?? "What data structures could help here?",
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed database
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const defaultProblems = [
    {
      title: "Two Sum",
      topic: "Arrays",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9"
      ],
      testCases: [
        { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
        { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
        { input: "[3,3], 6", expectedOutput: "[0,1]" }
      ],
      startingCode: "function twoSum(nums, target) {\n  // Your code here\n}"
    },
    {
      title: "FizzBuzz",
      topic: "Loops",
      difficulty: "Easy",
      description: "Given an integer n, return a string array answer where answer[i] is 'FizzBuzz' if divisible by 3 and 5, 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, otherwise the number.",
      examples: [
        { input: "n = 3", output: "['1','2','Fizz']" }
      ],
      constraints: [
        "1 <= n <= 10^4"
      ],
      testCases: [
        { input: "3", expectedOutput: "['1','2','Fizz']" },
        { input: "5", expectedOutput: "['1','2','Fizz','4','Buzz']" },
        { input: "15", expectedOutput: "['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz']" }
      ],
      startingCode: "function fizzBuzz(n) {\n  // Your code here\n}"
    },
    {
      title: "Reverse String",
      topic: "Strings",
      difficulty: "Easy",
      description: "Write a function that reverses a string. The input string is given as an array of characters s.",
      examples: [
        { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }
      ],
      constraints: [
        "1 <= s.length <= 10^5",
        "s[i] is a printable ascii character."
      ],
      testCases: [
        { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
        { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' }
      ],
      startingCode: "function reverseString(s) {\n  // Your code here\n}"
    },
    {
      title: "Fibonacci Number",
      topic: "Recursion",
      difficulty: "Easy",
      description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, in which each number is the sum of the two preceding ones.",
      examples: [
        { input: "n = 2", output: "1" },
        { input: "n = 3", output: "2" },
        { input: "n = 4", output: "3" }
      ],
      constraints: [
        "0 <= n <= 30"
      ],
      testCases: [
        { input: "2", expectedOutput: "1" },
        { input: "3", expectedOutput: "2" },
        { input: "4", expectedOutput: "3" }
      ],
      startingCode: "function fib(n) {\n  // Your code here\n}"
    },
    {
      title: "Merge Sorted Array",
      topic: "Sorting",
      difficulty: "Medium",
      description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array.",
      examples: [
        { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" }
      ],
      constraints: [
        "nums1.length == m + n",
        "nums2.length == n",
        "0 <= m, n <= 200"
      ],
      testCases: [
        { input: "[1,2,3,0,0,0], 3, [2,5,6], 3", expectedOutput: "[1,2,2,3,5,6]" }
      ],
      startingCode: "function merge(nums1, m, nums2, n) {\n  // Your code here\n}"
    },
    {
      title: "Valid Parentheses",
      topic: "Strings",
      difficulty: "Medium",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: [
        { input: 's = "()"', output: "true" },
        { input: 's = "()[]{}"', output: "true" },
        { input: 's = "(]"', output: "false" }
      ],
      constraints: [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}'"
      ],
      testCases: [
        { input: '"()"', expectedOutput: "true" },
        { input: '"()[]{}"', expectedOutput: "true" },
        { input: '"(]"', expectedOutput: "false" }
      ],
      startingCode: "function isValid(s) {\n  // Your code here\n}"
    },
    {
      title: "Climbing Stairs",
      topic: "Dynamic Programming",
      difficulty: "Medium",
      description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
      examples: [
        { input: "n = 2", output: "2" },
        { input: "n = 3", output: "3" }
      ],
      constraints: [
        "1 <= n <= 45"
      ],
      testCases: [
        { input: "2", expectedOutput: "2" },
        { input: "3", expectedOutput: "3" },
        { input: "4", expectedOutput: "5" }
      ],
      startingCode: "function climbStairs(n) {\n  // Your code here\n}"
    },
    {
      title: "Maximum Subarray",
      topic: "Dynamic Programming",
      difficulty: "Hard",
      description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      examples: [
        { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" }
      ],
      constraints: [
        "1 <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4"
      ],
      testCases: [
        { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
        { input: "[5,-3,5]", expectedOutput: "7" }
      ],
      startingCode: "function maxSubArray(nums) {\n  // Your code here\n}"
    }
  ];

  // Check if we have all problems, add missing ones
  const existing = await storage.getProblems();
  for (const problem of defaultProblems) {
    const exists = existing.some(p => p.title === problem.title);
    if (!exists) {
      await db.insert(problems).values(problem);
    }
  }
  
  if (existing.length < defaultProblems.length) {
    console.log(`Seeded ${defaultProblems.length - existing.length} new problems`);
  }
}
