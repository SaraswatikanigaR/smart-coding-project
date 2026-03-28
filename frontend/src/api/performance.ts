// 1. Define the shape of a single result
interface QuizResult {
  topic_id: string;
  passed: boolean;
}

// 2. Use that interface in the function signature
export const submitQuizResults = async (userId: string, results: QuizResult[]) => {
  // Use a fallback URL if the env variable isn't loaded yet
  const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

  const response = await fetch(`${API_URL}/questions/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, results }),
  });

  if (!response.ok) {
    throw new Error("Failed to save progress to the database");
  }

  return response.json();
};