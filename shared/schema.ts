import { pgTable, serial, text, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  topic: text("topic").notNull(),
  difficulty: text("difficulty").notNull(),
  description: text("description").notNull(),
  examples: json("examples").notNull(), // { input: string, output: string }[]
  constraints: json("constraints").notNull(), // string[]
  testCases: json("test_cases").notNull(), // { input: string, expectedOutput: string }[]
  startingCode: text("starting_code").notNull(),
});

export const insertProblemSchema = createInsertSchema(problems).omit({ id: true });
export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = typeof problems.$inferSelect;

export const evaluateRequestSchema = z.object({
  code: z.string(),
  problemId: z.number(),
});
export type EvaluateRequest = z.infer<typeof evaluateRequestSchema>;

export const evaluateResponseSchema = z.object({
  passed: z.number(),
  total: z.number(),
  runtime: z.number(),
  memory: z.number(),
  qualityScore: z.number(),
  efficiency: z.string(),
  issue: z.string(),
  complexity: z.number(),
  loopDepth: z.number(),
  lines: z.number(),
  functions: z.number(),
  aiExplanation: z.string(),
  suggestedApproach: z.union([z.string(), z.array(z.string())]),
  thinkAboutThis: z.string(),
});
export type EvaluateResponse = z.infer<typeof evaluateResponseSchema>;
