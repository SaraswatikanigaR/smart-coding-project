import { useState } from "react";

// 1. Matches your 'questions' and 'mcq_options' table attributes
interface Question {
  question_id: string;   
  topic_id: string;
  question_type: 'mcq' | 'coding';
  title: string;
  description: string;
  difficulty: string;
  options: { 
    text: string;        
    is_correct: boolean; 
  }[];
}

interface QuizResult {
  topic_id: string;
  question_id: string;
  passed: boolean;
}

export const useQuiz = (
  questions: Question[], 
  onComplete: (results: QuizResult[]) => void
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizResult[]>([]);

  const handleAnswer = (isCorrect: boolean) => {
    if (!questions || questions.length === 0) return;

    const currentQuestion = questions[currentIndex];
    
    const newAnswer: QuizResult = {
      topic_id: currentQuestion.topic_id,
      question_id: currentQuestion.question_id, // Added to track specific question performance
      passed: isCorrect,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  return {
    currentIndex,
    currentQuestion: questions[currentIndex] || null,
    handleAnswer,
    isLastQuestion: questions ? currentIndex === questions.length - 1 : false,
    progress: questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  };
};