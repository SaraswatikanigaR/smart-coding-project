import { db } from "./db";
import { problems, type Problem } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProblems(): Promise<Problem[]>;
  getProblem(id: number): Promise<Problem | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getProblems(): Promise<Problem[]> {
    return await db.select().from(problems);
  }

  async getProblem(id: number): Promise<Problem | undefined> {
    const [problem] = await db.select().from(problems).where(eq(problems.id, id));
    return problem;
  }
}

export const storage = new DatabaseStorage();
