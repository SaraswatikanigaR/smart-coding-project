import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { submitQuizResults } from "../api/performance";

// Define the exact shape of a Question from your database
interface Question {
  question_id: string;
  topic_id: string;
  question_type: 'mcq' | 'coding';
  title: string;
  description: string;
  difficulty: string;
  options: { text: string; is_correct: boolean }[];
}

// Define the shape of the results sent to the backend
interface QuizResult {
  topic_id: string;
  question_id: string;
  passed: boolean;
}

const TEST_USER_ID = "86d803f3-6da5-4191-8f43-984b4b02fef1";

const Sprint = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);

  // Pass the type to useQuery: <{ questions: Question[] }>
  const { data, isLoading } = useQuery<{ questions: Question[] }>({
    queryKey: ["sprint", TEST_USER_ID],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/modes/sprint/${TEST_USER_ID}`);
      return res.json();
    },
  });

  const mutation = useMutation({
    // Use the QuizResult interface instead of any[]
    mutationFn: (results: QuizResult[]) => submitQuizResults(TEST_USER_ID, results),
    onSuccess: () => {
      alert("Sprint Complete!");
      navigate("/");
    },
  });

  const quiz = useQuiz(data?.questions || [], (final) => mutation.mutate(final));

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/");
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  if (isLoading) return <div className="p-20 text-center text-white">Loading...</div>;
  if (!quiz.currentQuestion) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between mb-4">
          <span className="text-pink-500 font-bold text-4xl">{timeLeft}s</span>
          <span className="text-slate-400">Question {quiz.currentIndex + 1}/{data?.questions.length}</span>
        </div>

        <div className="bg-slate-900 border-2 border-pink-500/20 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-8">{quiz.currentQuestion.title}</h2>
          <div className="grid gap-4">
            {/* opt is now automatically typed because quiz.currentQuestion is typed */}
            {quiz.currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                className="w-full p-5 text-left bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-pink-500/10"
                onClick={() => quiz.handleAnswer(opt.is_correct)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprint;