import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { submitQuizResults } from "../api/performance";
// import { useQuiz, type Question } from "../hooks/useQuiz"; // Import the type here

// 1. Define the interfaces to remove all 'any' errors
// src/pages/Revision.tsx

interface Question {
  question_id: string;
  topic_id: string;
  question_type: 'mcq' | 'coding'; // Added
  title: string;
  description: string;           // Added
  difficulty: string;            // Added
  options: { 
    text: string; 
    is_correct: boolean 
  }[];
}

interface QuizResult {
  topic_id: string;
  question_id: string;
  passed: boolean;
}

const TEST_USER_ID = "86d803f3-6da5-4191-8f43-984b4b02fef1";

const Revision = () => {
  const navigate = useNavigate();

  // 2. Fetch Questions - explicitly typing the response
  const { data, isLoading } = useQuery<{ questions: Question[] }>({
    queryKey: ["revision", TEST_USER_ID],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/modes/revision/${TEST_USER_ID}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  // 3. Set up Mutation for submitting quiz results
  const mutation = useMutation({
    mutationFn: (payload: { userId: string; results: QuizResult[] }) => 
      submitQuizResults(payload.userId, payload.results),
    onSuccess: () => {
      alert("Progress saved!");
      navigate("/");
    },
  });

  // 4. Initialize Quiz Logic
  const quiz = useQuiz(data?.questions || [], (finalResults) => {
    mutation.mutate({ 
      userId: TEST_USER_ID, 
      results: finalResults 
    });
  });

  if (isLoading) return <div className="p-10 text-center text-white">Loading Questions...</div>;
  if (!data?.questions || data.questions.length === 0) {
    return <div className="p-10 text-center text-white">No questions found for your revision.</div>;
  }

  // Destructure from the quiz object
  const { currentQuestion, handleAnswer, currentIndex } = quiz;

  // Safety check for currentQuestion
  if (!currentQuestion) return null;

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
          Revision Mode
        </span>
        <h2 className="text-xl font-semibold mt-2">{currentQuestion.title}</h2>
      </div>

      <div className="grid gap-3">
        {currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            // Standard HTML button with Tailwind classes to replace custom <Button />
            className="w-full justify-start h-auto p-4 text-left border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-colors bg-transparent"
            onClick={() => handleAnswer(opt.is_correct)}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-slate-500">
        Question {currentIndex + 1} of {data.questions.length}
      </div>
      
      {/* Show saving state */}
      {mutation.isPending && (
        <div className="mt-4 text-blue-400 text-xs animate-pulse">Saving results...</div>
      )}
    </div>
  );
};

export default Revision;